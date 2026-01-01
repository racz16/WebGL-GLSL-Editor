import { TextDocument, Uri } from 'vscode';
import { GlslEditor } from '../core/glsl-editor';
import { ExpandedDocument } from './expanded-document';
import { IncludeExpander } from './include-expander';

function key(uri: Uri): string {
    return uri.toString(true);
}

interface CacheEntry {
    version: number;
    expanded: ExpandedDocument | null;
    inFlight: Promise<void> | null;
    deps: Set<string>; // includes + self (uriKey strings)
}

/**
 * Phase 3: asynchronous expansion cache.
 *
 * Providers remain synchronous by consuming the most recently expanded snapshot.
 */
export class ExpandedDocumentCache {
    private static entries = new Map<string, CacheEntry>();
    private static reverseDeps = new Map<string, Set<string>>(); // included -> roots

    public static clear(): void {
        this.entries.clear();
        this.reverseDeps.clear();
    }

    public static invalidate(uri: Uri): void {
        const k = key(uri);
        // Direct entry
        this.entries.delete(k);

        // Invalidate the document info as well so providers re-process.
        GlslEditor.getDocumentInfo(uri).invalidate();

        // Any roots that depend on this uri
        const roots = this.reverseDeps.get(k);
        if (roots) {
            for (const rootKey of roots) {
                this.entries.delete(rootKey);

                // Also invalidate the dependent root DocumentInfo.
                try {
                    GlslEditor.getDocumentInfo(Uri.parse(rootKey)).invalidate();
                } catch {
                    // ignore parse failures
                }
            }
        }

        // Note: reverseDeps is intentionally kept; it will be refreshed on next expansion.
    }

    public static get(document: TextDocument): ExpandedDocument | null {
        const e = this.entries.get(key(document.uri));
        if (!e) {
            return null;
        }
        if (e.version !== document.version) {
            return null;
        }
        return e.expanded;
    }

    public static schedule(document: TextDocument): void {
        const options = GlslEditor.CONFIGURATIONS.getIncludeResolverOptions();
        if (!options.enabled) {
            return;
        }

        const k = key(document.uri);
        const existing = this.entries.get(k);
        if (existing && existing.version === document.version) {
            if (existing.expanded) {
                return;
            }
            if (existing.inFlight) {
                return;
            }
        }

        const entry: CacheEntry = {
            version: document.version,
            expanded: null,
            inFlight: null,
            deps: new Set<string>(),
        };
        this.entries.set(k, entry);

        entry.inFlight = (async () => {
            try {
                entry.expanded = await IncludeExpander.expand(document.uri, document.getText(), options);
                this.updateDependencyIndex(k, entry.expanded);

                // Trigger re-parse on next provider invocation with the now-available snapshot.
                GlslEditor.getDocumentInfo(document.uri).invalidate();
            } finally {
                entry.inFlight = null;
            }
        })();
    }

    private static updateDependencyIndex(rootKey: string, expanded: ExpandedDocument): void {
        const entry = this.entries.get(rootKey);
        if (!entry) {
            return;
        }

        // Remove previous reverse deps
        for (const depKey of entry.deps) {
            const set = this.reverseDeps.get(depKey);
            if (set) {
                set.delete(rootKey);
                if (set.size === 0) {
                    this.reverseDeps.delete(depKey);
                }
            }
        }

        // Compute new deps from expanded sources.
        const deps = new Set<string>();
        for (const k of expanded.sources.keys()) {
            deps.add(k);
        }
        deps.add(rootKey);
        entry.deps = deps;

        for (const depKey of deps) {
            let set = this.reverseDeps.get(depKey);
            if (!set) {
                set = new Set<string>();
                this.reverseDeps.set(depKey, set);
            }
            set.add(rootKey);
        }
    }
}
