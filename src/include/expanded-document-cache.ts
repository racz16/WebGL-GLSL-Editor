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
}

/**
 * Phase 3: asynchronous expansion cache.
 *
 * Providers remain synchronous by consuming the most recently expanded snapshot.
 */
export class ExpandedDocumentCache {
    private static entries = new Map<string, CacheEntry>();

    public static clear(): void {
        this.entries.clear();
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
        };
        this.entries.set(k, entry);

        entry.inFlight = (async () => {
            try {
                entry.expanded = await IncludeExpander.expand(document.uri, document.getText(), options);
            } finally {
                entry.inFlight = null;
            }
        })();
    }
}
