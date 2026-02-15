import React, { useEffect, useMemo, useRef, useState } from 'react';
import { FileText, Copy, Download, Plus, Trash2, Edit2, GripVertical, Maximize2, Minimize2, ZoomIn, ZoomOut, Save, X, Gavel, History, BookOpen, GitBranch, MessageSquare, Settings, Search, Zap, Heading1, Heading2, Type, Bold, Italic, List, ListOrdered, ChevronRight, Scale } from 'lucide-react';
import {
    DndContext,
    DragOverlay,
    closestCenter,
    KeyboardSensor,
    PointerSensor,
    useSensor,
    useSensors,
    type DragEndEvent,
} from '@dnd-kit/core';
import {
    arrayMove,
    SortableContext,
    sortableKeyboardCoordinates,
    verticalListSortingStrategy,
    useSortable,
} from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { type RagKnowledgeEntry, searchRagKnowledge } from '../../data/ragKnowledge';

interface Template {
    id: number;
    name: string;
    type: string;
    uses: number;
    lastUsed: string;
    desc: string;
    color: string;
    content: string;
}

function getDefaultContent(name: string, type: string, desc: string) {
    return `
        <h2>TYTUŁ DOKUMENTU: ${name}</h2>
        <p><strong>Kategoria:</strong> ${type}</p>
        <p><strong>Data:</strong> ${new Date().toLocaleDateString('pl-PL')}</p>
        <p><strong>Opis:</strong> ${desc}</p>
        <p><strong>Treść dokumentu:</strong></p>
        <p>...............................................................................</p>
        <p>...............................................................................</p>
        <p>...............................................................................</p>
        <p><strong>Podpis:</strong> ........................................</p>
    `.trim();
}

function normalizeTemplateContent(content: string) {
    if (!content) return '<p></p>';
    if (/<\/?[a-z][\s\S]*>/i.test(content)) {
        return content;
    }

    return content
        .split(/\n\n+/)
        .map((paragraph) => `<p>${paragraph.replace(/\n/g, '<br/>')}</p>`)
        .join('');
}

function stripHtml(input: string) {
    if (typeof document === 'undefined') return input;
    const node = document.createElement('div');
    node.innerHTML = input;
    return node.textContent || node.innerText || '';
}

const initialTemplates: Template[] = [
    { id: 1, name: 'Pozew o zapłatę', type: 'Pozew', uses: 34, lastUsed: '2026-02-10', desc: 'Standardowy pozew w postępowaniu cywilnym o roszczenie pieniężne', color: '#ef4444', content: getDefaultContent('Pozew o zapłatę', 'Pozew', 'Standardowy pozew w postępowaniu cywilnym o roszczenie pieniężne') },
    { id: 2, name: 'Apelacja od wyroku', type: 'Apelacja', uses: 12, lastUsed: '2026-02-08', desc: 'Szablon apelacji od wyroku sądu I instancji', color: '#3b82f6', content: getDefaultContent('Apelacja od wyroku', 'Apelacja', 'Szablon apelacji od wyroku sądu I instancji') },
    { id: 3, name: 'Wniosek o zabezpieczenie', type: 'Wniosek', uses: 8, lastUsed: '2026-02-05', desc: 'Wniosek o zabezpieczenie roszczenia w postępowaniu cywilnym', color: '#10b981', content: getDefaultContent('Wniosek o zabezpieczenie', 'Wniosek', 'Wniosek o zabezpieczenie roszczenia w postępowaniu cywilnym') },
    { id: 4, name: 'Umowa zlecenie', type: 'Umowa', uses: 22, lastUsed: '2026-02-09', desc: 'Uniwersalny szablon umowy zlecenia', color: '#a855f7', content: getDefaultContent('Umowa zlecenie', 'Umowa', 'Uniwersalny szablon umowy zlecenia') },
    { id: 5, name: 'Pismo przewodnie', type: 'Pismo', uses: 45, lastUsed: '2026-02-11', desc: 'Pismo przewodnie do sądu z załącznikami', color: '#f59e0b', content: getDefaultContent('Pismo przewodnie', 'Pismo', 'Pismo przewodnie do sądu z załącznikami') },
    { id: 6, name: 'Odwołanie od decyzji ZUS', type: 'Odwołanie', uses: 6, lastUsed: '2026-01-28', desc: 'Odwołanie od decyzji organu rentowego do sądu pracy', color: '#6366f1', content: getDefaultContent('Odwołanie od decyzji ZUS', 'Odwołanie', 'Odwołanie od decyzji organu rentowego do sądu pracy') },
];

function SortableItem({
    template,
    onDelete,
    onEdit,
    onDownload,
    onCopy,
}: {
    template: Template;
    onDelete: (id: number) => void;
    onEdit: (t: Template) => void;
    onDownload: (t: Template) => void;
    onCopy: (t: Template) => void;
}) {
    const { attributes, listeners, setNodeRef, transform, transition, isDragging } = useSortable({
        id: template.id,
        transition: {
            duration: 220,
            easing: 'cubic-bezier(0.2, 0, 0, 1)',
        },
    });

    const style = {
        transform: CSS.Transform.toString(transform),
        transition,
        zIndex: isDragging ? 20 : 1,
        opacity: isDragging ? 0.88 : 1,
        boxShadow: isDragging ? '0 18px 40px rgba(15, 23, 42, 0.35)' : undefined,
    };

    return (
        <div ref={setNodeRef} style={style} className="card relative group overflow-hidden h-full min-h-55">
            <div className="absolute left-0 top-0 bottom-0 w-1.5" style={{ backgroundColor: template.color, opacity: 0.45 }} />
            <div className="p-5 h-full flex flex-col">
                <div className="flex justify-between items-start mb-3">
                    <div className="flex gap-3 items-center">
                        <div
                            {...attributes}
                            {...listeners}
                            className="drag-handle cursor-grab active:cursor-grabbing hover:text-var(--accent) text-var(--text-tertiary) rounded-md transition-transform hover:scale-105"
                            title="Przeciągnij, aby zmienić kolejność"
                        >
                            <GripVertical size={18} />
                        </div>
                        <div className="p-2 rounded-lg bg-var(--bg-secondary)">
                            <FileText size={20} className="text-var(--text-secondary)" />
                        </div>
                        <div>
                            <h4 className="font-semibold text-sm leading-tight">{template.name}</h4>
                            <div className="flex items-center gap-2 mt-1">
                                <span className="text-[10px] uppercase tracking-wider font-bold text-var(--text-tertiary)">{template.type}</span>
                                <span className="inline-block w-2 h-2 rounded-full" style={{ backgroundColor: template.color, opacity: 0.8 }} />
                            </div>
                        </div>
                    </div>
                    <div className="flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                        <button onClick={() => onEdit(template)} className="p-1.5 hover:bg-var(--bg-secondary) rounded text-var(--text-tertiary) hover:text-var(--text-primary)">
                            <Edit2 size={14} />
                        </button>
                        <button onClick={() => onDelete(template.id)} className="p-1.5 hover:bg-red-500/10 rounded text-var(--text-tertiary) hover:text-red-500">
                            <Trash2 size={14} />
                        </button>
                    </div>
                </div>

                <p className="text-xs text-var(--text-secondary) mb-4 line-clamp-2 leading-relaxed h-8">{template.desc}</p>

                <div className="flex justify-between items-center pt-3 border-t border-var(--border-secondary) mt-auto">
                    <div className="text-[11px] text-var(--text-tertiary)">
                        <span className="font-medium text-var(--text-secondary)">{template.uses}×</span> użyć
                    </div>
                    <div className="flex items-center gap-2.5 sm:gap-3">
                        <button className="btn btn-ghost btn-sm h-8 px-3 min-w-24" title="Kopiuj treść" onClick={() => onCopy(template)}>
                            <Copy size={13} /> Kopiuj
                        </button>
                        <button className="btn btn-secondary btn-sm h-8 px-3 text-xs" onClick={() => onDownload(template)}>
                            <Download size={13} /> Pobierz
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default function FirmTemplates() {
    const [templates, setTemplates] = useState<Template[]>(initialTemplates);
    const [isEditing, setIsEditing] = useState(false);
    const [currentTemplate, setCurrentTemplate] = useState<Template | null>(null);
    const [activeDragId, setActiveDragId] = useState<number | null>(null);
    const [ragSuggestions, setRagSuggestions] = useState<RagKnowledgeEntry[]>([]);
    const [ragQuery, setRagQuery] = useState('');
    const [isFullscreen, setIsFullscreen] = useState(false);
    const [editorZoom, setEditorZoom] = useState(100);
    const [suggestionIndex, setSuggestionIndex] = useState(0);
    const [tooltipPos, setTooltipPos] = useState({ top: 0, left: 0 });
    const editorRef = useRef<HTMLDivElement | null>(null);

    const sensors = useSensors(
        useSensor(PointerSensor, {
            activationConstraint: {
                distance: 6,
            },
        }),
        useSensor(KeyboardSensor, {
            coordinateGetter: sortableKeyboardCoordinates,
        })
    );

    const handleDragEnd = (event: DragEndEvent) => {
        const { active, over } = event;

        if (over && active.id !== over.id) {
            setTemplates((items) => {
                const oldIndex = items.findIndex((i) => i.id === active.id);
                const newIndex = items.findIndex((i) => i.id === over.id);
                return arrayMove(items, oldIndex, newIndex);
            });
        }

        setActiveDragId(null);
    };

    const handleDelete = (id: number) => {
        if (window.confirm('Czy na pewno chcesz usunąć ten szablon?')) {
            setTemplates((prev) => prev.filter((t) => t.id !== id));
        }
    };

    const handleEdit = (template: Template) => {
        setCurrentTemplate({ ...template, content: normalizeTemplateContent(template.content) });
        setIsEditing(true);
        setEditorZoom(100);
    };

    const handleDownload = (template: Template) => {
        setCurrentTemplate({ ...template, content: normalizeTemplateContent(template.content) });
        setIsEditing(true);
    };

    const handleSave = () => {
        if (!currentTemplate) return;
        setTemplates((prev) => prev.map((t) => (t.id === currentTemplate.id ? currentTemplate : t)));
        setIsEditing(false);
        setCurrentTemplate(null);
        setIsFullscreen(false);
    };

    const handlePrintA4 = () => {
        if (!currentTemplate) return;

        const printWindow = window.open('', '_blank', 'width=900,height=1200');
        if (!printWindow) return;

        const safeHtml = currentTemplate.content.replace(/<script[\s\S]*?>[\s\S]*?<\/script>/gi, '');

        printWindow.document.write(`
            <!doctype html>
            <html lang="pl">
            <head>
                <meta charset="UTF-8" />
                <title>${currentTemplate.name}</title>
                <style>
                    @page { size: A4; margin: 16mm; }
                    body { margin: 0; font-family: Roboto, Arial, sans-serif; background: #f4f6fb; }
                    .a4 {
                        width: 210mm;
                        min-height: 297mm;
                        margin: 16px auto;
                        background: white;
                        box-sizing: border-box;
                        padding: 16mm;
                        border: 1px solid #dbe2ef;
                    }
                    h1 { margin: 0 0 8px; font-size: 20px; }
                    .meta { margin: 0 0 16px; color: #64748b; font-size: 12px; }
                    .content { font-size: 12px; line-height: 1.6; color: #0f172a; }
                    .content h1,.content h2,.content h3 { margin: 0 0 8px; }
                    .content p { margin: 0 0 8px; }
                    .content ul,.content ol { margin: 0 0 8px 20px; }
                    @media print {
                        body { background: white; }
                        .a4 { margin: 0; border: none; }
                    }
                </style>
            </head>
            <body>
                <article class="a4">
                    <h1>${currentTemplate.name}</h1>
                    <p class="meta">Kategoria: ${currentTemplate.type}</p>
                    <div class="content">${safeHtml}</div>
                </article>
            </body>
            </html>
        `);
        printWindow.document.close();
        printWindow.focus();
        printWindow.print();
    };

    const handleAdd = () => {
        const newTemplate: Template = {
            id: Date.now(),
            name: 'Nowy szablon',
            type: 'Inne',
            uses: 0,
            lastUsed: new Date().toISOString().split('T')[0],
            desc: 'Opis nowego szablonu...',
            color: '#94a3b8',
            content: getDefaultContent('Nowy szablon', 'Inne', 'Opis nowego szablonu...'),
        };
        setTemplates([newTemplate, ...templates]);
    };

    const applyEditorCommand = (command: string, value?: string) => {
        editorRef.current?.focus();
        document.execCommand(command, false, value ?? '');
        if (editorRef.current && currentTemplate) {
            setCurrentTemplate({ ...currentTemplate, content: editorRef.current.innerHTML });
        }
    };

    const updateRagSuggestions = (text: string) => {
        const recentChunk = text.slice(Math.max(0, text.length - 220));
        const match = recentChunk.match(/(art\.?\s*\d*[a-z]?|§\s*\d*[a-z]?)/i);
        const query = (match?.[1] || '').trim();

        if (query.length < 4) {
            setRagQuery('');
            setRagSuggestions([]);
            return;
        }

        // Update tooltip position
        const selection = window.getSelection();
        if (selection && selection.rangeCount > 0) {
            const range = selection.getRangeAt(0);
            const rect = range.getBoundingClientRect();
            if (rect) {
                setTooltipPos({ 
                    top: rect.top - 10, 
                    left: rect.left + 5 
                });
            }
        }

        setRagQuery(query);
        const results = searchRagKnowledge(query, 3);
        setRagSuggestions(results);
        setSuggestionIndex(0);
    };

    const handleEditorInput = (event: React.FormEvent<HTMLDivElement>) => {
        if (!currentTemplate) return;
        const html = event.currentTarget.innerHTML;
        const text = event.currentTarget.innerText;
        setCurrentTemplate({ ...currentTemplate, content: html });
        updateRagSuggestions(text);
    };

    const handleEditorKeyDown = (e: React.KeyboardEvent<HTMLDivElement>) => {
        if (ragSuggestions.length > 0) {
            if (e.key === 'Tab') {
                e.preventDefault();
                const entry = ragSuggestions[suggestionIndex];
                // Insert only the article part
                applyEditorCommand('insertText', ` ${entry.art} `);
                setRagSuggestions([]);
                setRagQuery('');
                return;
            }
            if (e.key === 'ArrowDown') {
                e.preventDefault();
                setSuggestionIndex((prev) => (prev + 1) % ragSuggestions.length);
                return;
            }
            if (e.key === 'ArrowUp') {
                e.preventDefault();
                setSuggestionIndex((prev) => (prev - 1 + ragSuggestions.length) % ragSuggestions.length);
                return;
            }
            if (e.key === 'Enter') {
                // If it's a suggestion list, maybe enter should insert full snippet?
                // User said "tab" for just article. Let's keep Enter as default unless specified.
            }
            if (e.key === 'Escape') {
                setRagSuggestions([]);
                setRagQuery('');
                return;
            }
        }
    };

    const insertRagSuggestion = (entry: RagKnowledgeEntry) => {
        const snippet = `<p><strong>${entry.art} (${entry.code})</strong> — ${entry.title}</p><p>${entry.content}</p>`;
        applyEditorCommand('insertHTML', snippet);
        setRagSuggestions([]);
        setRagQuery('');
    };

    const handleCopy = async (template: Template) => {
        const plainText = stripHtml(normalizeTemplateContent(template.content));
        await navigator.clipboard.writeText(plainText);
    };

    const handleEditorZoomIn = () => {
        setEditorZoom((prev) => Math.min(prev + 10, 200));
    };

    const handleEditorZoomOut = () => {
        setEditorZoom((prev) => Math.max(prev - 10, 50));
    };

    const handleEditorZoomReset = () => {
        setEditorZoom(100);
    };

    const toggleFullscreen = async () => {
        try {
            if (!document.fullscreenElement) {
                await document.documentElement.requestFullscreen();
                setIsFullscreen(true);
            } else {
                await document.exitFullscreen();
                setIsFullscreen(false);
            }
        } catch (err) {
            console.error('Fullscreen error:', err);
            setIsFullscreen(!isFullscreen);
        }
    };

    useEffect(() => {
        const handleFullscreenChange = () => {
            setIsFullscreen(!!document.fullscreenElement);
        };

        document.addEventListener('fullscreenchange', handleFullscreenChange);
        return () => document.removeEventListener('fullscreenchange', handleFullscreenChange);
    }, []);

    useEffect(() => {
        if (!isEditing || !currentTemplate || !editorRef.current) return;
        editorRef.current.innerHTML = currentTemplate.content;
    }, [isEditing, currentTemplate?.id]);

    const activeDragTemplate = templates.find((t) => t.id === activeDragId) || null;
    const toolbarButtons = useMemo(
        () => [
            { label: <Bold size={16} />, title: 'Pogrubienie', action: () => applyEditorCommand('bold'), group: 'text' },
            { label: <Italic size={16} />, title: 'Kursywa', action: () => applyEditorCommand('italic'), group: 'text' },
            { label: <Heading1 size={16} />, title: 'Nagłówek 1', action: () => applyEditorCommand('formatBlock', '<h1>'), group: 'format' },
            { label: <Heading2 size={16} />, title: 'Nagłówek 2', action: () => applyEditorCommand('formatBlock', '<h2>'), group: 'format' },
            { label: <Type size={16} />, title: 'Akapit', action: () => applyEditorCommand('formatBlock', '<p>'), group: 'format' },
            { label: <List size={16} />, title: 'Lista punktowana', action: () => applyEditorCommand('insertUnorderedList'), group: 'list' },
            { label: <ListOrdered size={16} />, title: 'Lista numerowana', action: () => applyEditorCommand('insertOrderedList'), group: 'list' },
            { label: <ChevronRight size={16} />, title: 'Zwiększ wcięcie', action: () => applyEditorCommand('indent'), group: 'list' },
        ],
        [currentTemplate]
    );

    return (
        <div className="animate-in">
            {!isEditing ? (
                <>
                    <div className="page-header">
                        <div>
                            <h2 className="flex items-center gap-3">
                                Szablony dokumentów
                                <span className="badge badge-neutral text-[10px] py-0.5">{templates.length}</span>
                            </h2>
                            <p className="page-header-sub">Zarządzaj wzorami pism i umów Twojej kancelarii</p>
                        </div>
                        <button onClick={handleAdd} className="btn btn-primary">
                            <Plus size={15} /> Dodaj szablon
                        </button>
                    </div>

                    <DndContext
                        sensors={sensors}
                        collisionDetection={closestCenter}
                        onDragStart={({ active }) => setActiveDragId(Number(active.id))}
                        onDragEnd={handleDragEnd}
                        onDragCancel={() => setActiveDragId(null)}
                    >
                        <div className="mt-8">
                            <SortableContext items={templates.map((t) => t.id)} strategy={verticalListSortingStrategy}>
                                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 lg:gap-6 auto-rows-fr items-stretch">
                                    {templates.map((t) => (
                                        <SortableItem
                                            key={t.id}
                                            template={t}
                                            onDelete={handleDelete}
                                            onEdit={handleEdit}
                                            onDownload={handleDownload}
                                            onCopy={handleCopy}
                                        />
                                    ))}
                                </div>
                            </SortableContext>
                        </div>
                        <DragOverlay dropAnimation={{ duration: 220, easing: 'cubic-bezier(0.2, 0, 0, 1)' }}>
                            {activeDragTemplate ? (
                                <div className="card relative overflow-hidden" style={{ width: 320 }}>
                                    <div className="absolute left-0 top-0 bottom-0 w-1.5" style={{ backgroundColor: activeDragTemplate.color, opacity: 0.45 }} />
                                    <div className="p-4">
                                        <div className="flex items-center gap-2 mb-2">
                                            <FileText size={16} className="text-var(--text-secondary)" />
                                            <h4 className="font-semibold text-sm">{activeDragTemplate.name}</h4>
                                        </div>
                                        <p className="text-xs text-var(--text-secondary)">{activeDragTemplate.desc}</p>
                                    </div>
                                </div>
                            ) : null}
                        </DragOverlay>
                    </DndContext>
                </>
            ) : currentTemplate && (
                <div className="flex flex-col bg-var(--bg-secondary) rounded-2xl shadow-2xl border border-var(--border-secondary) overflow-hidden animate-in fade-in slide-in-from-bottom-4 duration-500 w-full mx-auto" style={{ height: 'calc(100vh - 120px)' }}>
                    {/* Professional Header - Expert Workbench Style (App Color Adapted) */}
                    <div className="flex items-center justify-between border-b border-solid border-var(--border-secondary) bg-var(--bg-tertiary) px-6 py-4 shrink-0">
                        <div className="flex items-center gap-4">
                            <div className="size-10 bg-accent text-white rounded-xl flex items-center justify-center shadow-lg shadow-accent/20">
                                <Gavel size={22} />
                            </div>
                            <div className="flex flex-col">
                                <h3 className="text-var(--text-primary) text-base font-black leading-tight tracking-tight">
                                    LegalDoc <span className="text-accent">Pro</span> <span className="text-[10px] font-bold px-2 py-0.5 bg-accent/10 text-accent border border-accent/20 rounded ml-2 uppercase tracking-widest">Expert Workbench</span>
                                </h3>
                                <div className="flex items-center gap-2 mt-0.5">
                                    <span className="text-success text-[10px] font-black flex items-center gap-1.5 uppercase tracking-tighter">
                                        <span className="size-1.5 bg-success rounded-full animate-pulse shadow-[0_0_8px_rgba(16,185,129,0.5)]"></span>
                                        Synchronizacja Live Włączona
                                    </span>
                                </div>
                            </div>
                        </div>
                        <div className="flex items-center gap-2">
                            <button 
                                onClick={handlePrintA4}
                                className="btn btn-ghost btn-sm h-10 px-4 text-xs font-bold text-var(--text-secondary) hover:text-var(--text-primary)" 
                                title="Eksportuj do PDF"
                            >
                                <Download size={16} className="mr-2 text-accent" /> Export PDF
                            </button>
                            <button className="btn btn-ghost btn-sm h-10 px-4 text-xs font-bold text-var(--text-secondary) hover:text-var(--text-primary)" title="Historia zmian">
                                <History size={16} className="mr-2" /> Historia
                            </button>
                            <div className="h-6 w-px bg-var(--border-secondary) mx-1"></div>
                            <button 
                                onClick={handleSave}
                                className="btn btn-primary h-10 px-6 font-bold shadow-md text-xs bg-accent hover:bg-accent-dark border-none"
                            >
                                <Save size={16} className="mr-2" /> Zapisz zmiany
                            </button>
                            <button
                                onClick={() => {
                                    setIsEditing(false);
                                    setCurrentTemplate(null);
                                    setRagSuggestions([]);
                                    setRagQuery('');
                                }}
                                className="ml-2 p-2 text-var(--text-tertiary) hover:text-error hover:bg-error-bg rounded-lg transition-colors border border-transparent hover:border-error/20"
                            >
                                <X size={20} />
                            </button>
                        </div>
                    </div>

                    <main className="flex flex-1 overflow-hidden bg-var(--bg-primary)">
                        {/* Left Sidebar: Tools & Structure */}
                        <aside className="w-64 flex flex-col bg-var(--bg-tertiary) border-r border-var(--border-secondary) shrink-0 overflow-y-auto">
                            <div className="p-5 space-y-6">
                                <div>
                                    <p className="text-[10px] font-bold text-var(--text-tertiary) mb-4 uppercase tracking-widest">Formatowanie</p>
                                    <div className="grid grid-cols-4 gap-2">
                                        {toolbarButtons.filter(b => b.group === 'text' || b.group === 'format').map((btn, idx) => (
                                            <button 
                                                key={idx}
                                                onClick={btn.action}
                                                className="flex items-center justify-center size-9 rounded-lg border border-var(--border-secondary) hover:border-accent hover:bg-accent/10 text-var(--text-secondary) hover:text-accent transition-all"
                                                title={btn.title}
                                            >
                                                {btn.label}
                                            </button>
                                        ))}
                                    </div>
                                    <div className="grid grid-cols-4 gap-2 mt-2">
                                        {toolbarButtons.filter(b => b.group === 'list').map((btn, idx) => (
                                            <button 
                                                key={idx}
                                                onClick={btn.action}
                                                className="flex items-center justify-center size-9 rounded-lg border border-var(--border-secondary) hover:border-accent hover:bg-accent/10 text-var(--text-secondary) hover:text-accent transition-all"
                                                title={btn.title}
                                            >
                                                {btn.label}
                                            </button>
                                        ))}
                                    </div>
                                </div>

                                <div className="h-px bg-var(--border-secondary)"></div>

                                <div>
                                    <p className="text-[10px] font-bold text-var(--text-tertiary) mb-3 uppercase tracking-widest">Narzędzia Procesowe</p>
                                    <nav className="space-y-1">
                                        <button className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-var(--text-secondary) hover:bg-var(--bg-secondary) hover:text-accent transition-colors group">
                                            <BookOpen size={16} className="text-var(--text-tertiary) group-hover:text-accent" />
                                            <span className="text-[11px] font-bold">Biblioteka Klauzul</span>
                                        </button>
                                        <button className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-var(--text-secondary) hover:bg-var(--bg-secondary) hover:text-accent transition-colors group">
                                            <GitBranch size={16} className="text-var(--text-tertiary) group-hover:text-accent" />
                                            <span className="text-[11px] font-bold">Inteligentne Odsyłacze</span>
                                        </button>
                                        <button className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-var(--text-secondary) hover:bg-var(--bg-secondary) hover:text-accent transition-colors group">
                                            <MessageSquare size={16} className="text-var(--text-tertiary) group-hover:text-accent" />
                                            <span className="text-[11px] font-bold">Uwagi do Projektu</span>
                                            <span className="ml-auto bg-accent/10 text-accent text-[9px] px-2 py-0.5 rounded-full font-black border border-accent/20">5</span>
                                        </button>
                                    </nav>
                                </div>

                                <div className="h-px bg-var(--border-secondary)"></div>

                                <div>
                                    <p className="text-[10px] font-bold text-var(--text-tertiary) mb-3 uppercase tracking-widest">Struktura Pisma</p>
                                    <div className="space-y-3 pl-2 border-l-2 border-var(--border-secondary)">
                                        <div className="text-[11px] font-black text-accent border-l-2 border-accent -ml-[10px] pl-2 bg-accent/5 rounded-r-md py-1">Komparycja</div>
                                        <div className="text-[11px] font-bold text-var(--text-tertiary) hover:text-var(--text-primary) cursor-pointer pl-2 py-1 transition-colors">Wnioski Dowodowe</div>
                                        <div className="text-[11px] font-bold text-var(--text-tertiary) hover:text-var(--text-primary) cursor-pointer pl-2 py-1 transition-colors">Uzasadnienie</div>
                                        <div className="text-[11px] font-bold text-var(--text-tertiary) hover:text-var(--text-primary) cursor-pointer pl-2 py-1 transition-colors">Załączniki</div>
                                    </div>
                                </div>
                            </div>

                            <div className="mt-auto p-4 border-t border-var(--border-secondary)">
                                <button className="w-full h-10 flex items-center justify-center gap-3 bg-var(--bg-secondary) rounded-xl text-var(--text-tertiary) hover:text-accent transition-colors text-[11px] font-bold border border-var(--border-secondary)">
                                    <Settings size={16} />
                                    <span>Konfiguracja Edytora</span>
                                </button>
                            </div>
                        </aside>

                        {/* Center: A4 Workspace */}
                        <section className="flex-1 bg-var(--bg-primary) overflow-y-auto flex flex-col items-center py-12 px-8 relative custom-scrollbar">
                            <div 
                                className="bg-white shadow-[0_40px_100px_rgba(0,0,0,0.5)] min-h-[1100px] h-fit border border-var(--border-secondary) relative transition-all duration-500 transform origin-top mb-10"
                                style={{
                                    width: `${210 * (editorZoom / 100)}mm`,
                                    minHeight: `${297 * (editorZoom / 100)}mm`,
                                }}
                            >
                                {/* Sheet Content */}
                                <div
                                    ref={editorRef}
                                    className="w-full h-full focus:outline-none"
                                    contentEditable
                                    suppressContentEditableWarning
                                    onInput={handleEditorInput}
                                    onKeyDown={handleEditorKeyDown}
                                    style={{ 
                                        padding: `${25 * (editorZoom / 100)}mm`,
                                        fontSize: `${14 * (editorZoom / 100)}px`,
                                        lineHeight: 1.7,
                                        color: '#0f172a',
                                        fontFamily: '"Public Sans", sans-serif'
                                    }}
                                />

                                {/* Suggestion Popover (Floating Cloud) - App Color Adapted */}
                                {!!ragSuggestions.length && (
                                    <div 
                                        className="fixed z-[10000] w-80 bg-var(--bg-tertiary) rounded-2xl shadow-[0_20px_50px_rgba(0,0,0,0.6)] border border-accent/30 ring-1 ring-accent/20 overflow-hidden animate-in fade-in zoom-in-95"
                                        style={{ 
                                            top: `${tooltipPos.top - 180}px`, 
                                            left: `${tooltipPos.left}px`,
                                        }}
                                    >
                                        <div className="px-4 py-3 bg-accent text-white flex items-center justify-between">
                                            <div className="flex items-center gap-2">
                                                <Scale size={14} className="text-white/80" />
                                                <span className="text-[10px] font-black uppercase tracking-widest truncate font-mono">LEX-IQ: {ragQuery || 'SEARCH'}</span>
                                            </div>
                                            <span className="text-[9px] font-bold bg-white/20 px-2 py-0.5 rounded font-mono border border-white/20">TAB ↵</span>
                                        </div>
                                        <div className="p-1 max-h-[300px] overflow-y-auto custom-scrollbar bg-var(--bg-tertiary)">
                                            {ragSuggestions.map((entry, idx) => (
                                                <div 
                                                    key={idx} 
                                                    className={`p-3 rounded-xl transition-all cursor-pointer ${idx === suggestionIndex ? 'bg-accent/10 ring-1 ring-accent/30 scale-[0.98]' : 'hover:bg-var(--bg-secondary)'}`}
                                                    onClick={() => insertRagSuggestion(entry)}
                                                >
                                                    <div className="flex items-center justify-between mb-1">
                                                        <div className="text-[10px] font-black text-accent px-1.5 py-0.5 bg-accent/10 rounded uppercase border border-accent/20">{entry.art}</div>
                                                        <div className="text-[9px] font-bold text-var(--text-tertiary)">{entry.code}</div>
                                                    </div>
                                                    <div className="text-[11px] font-bold text-var(--text-primary) mb-1 leading-tight">{entry.title}</div>
                                                    <p className="text-[10px] text-var(--text-secondary) line-clamp-2 leading-relaxed italic">{entry.content}</p>
                                                </div>
                                            ))}
                                        </div>
                                        <div className="px-4 py-3 bg-var(--bg-secondary) border-t border-var(--border-secondary) flex justify-center">
                                            <button className="text-[10px] font-black text-accent hover:underline flex items-center gap-2 tracking-widest">
                                                <span>SZCZEGÓŁY ARTYKUŁU</span>
                                                <ChevronRight size={10} />
                                            </button>
                                        </div>
                                    </div>
                                )}
                            </div>

                            {/* Floating Toolbar Controls - App Color Adapted */}
                            <div className="fixed bottom-10 left-[calc(50%+32px)] -translate-x-1/2 bg-var(--bg-tertiary)/90 backdrop-blur-xl rounded-2xl shadow-[0_20px_60px_rgba(0,0,0,0.6)] border border-var(--border-primary) px-6 py-4 flex items-center gap-8 z-50 ring-1 ring-accent/10">
                                <div className="flex items-center gap-4 border-r border-var(--border-secondary) pr-8">
                                    <span className="text-[10px] font-black text-var(--text-tertiary) uppercase tracking-widest">Skala Widoku</span>
                                    <div className="flex items-center gap-3">
                                        <button onClick={handleEditorZoomOut} className="size-8 flex items-center justify-center hover:bg-var(--bg-secondary) rounded-lg transition-colors bg-var(--bg-secondary)/50 text-var(--text-secondary) border border-var(--border-secondary)"><ZoomOut size={16} /></button>
                                        <button onClick={handleEditorZoomReset} className="text-xs font-black min-w-[45px] text-center text-accent group">
                                            <span className="group-hover:hidden">{editorZoom}%</span>
                                            <span className="hidden group-hover:inline">AUTO</span>
                                        </button>
                                        <button onClick={handleEditorZoomIn} className="size-8 flex items-center justify-center hover:bg-var(--bg-secondary) rounded-lg transition-colors bg-var(--bg-secondary)/50 text-var(--text-secondary) border border-var(--border-secondary)"><ZoomIn size={16} /></button>
                                    </div>
                                </div>
                                <div className="flex items-center gap-4">
                                    <span className="text-[10px] font-black text-var(--text-tertiary) uppercase tracking-widest">Kolorystyka</span>
                                    <div className="flex items-center gap-2">
                                        <input 
                                            type="color" 
                                            value={currentTemplate.color} 
                                            onChange={(e) => setCurrentTemplate({...currentTemplate, color: e.target.value})}
                                            className="size-7 rounded-lg overflow-hidden cursor-pointer border-2 border-var(--bg-tertiary) shadow-md ring-1 ring-var(--border-secondary) p-0 bg-transparent"
                                        />
                                        <button
                                            onClick={toggleFullscreen}
                                            className="size-9 flex items-center justify-center hover:bg-var(--bg-secondary) rounded-lg transition-colors text-var(--text-secondary) border border-var(--border-secondary) ml-2"
                                            title="Tryb pełnoekranowy"
                                        >
                                            {isFullscreen ? <Minimize2 size={18} /> : <Maximize2 size={18} />}
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </section>

                        {/* Right Sidebar: Analytics & Preview */}
                        <aside className="w-[380px] bg-var(--bg-tertiary) border-l border-var(--border-secondary) flex flex-col shrink-0">
                            <div className="p-5 border-b border-var(--border-secondary) flex items-center justify-between bg-var(--bg-secondary)/30">
                                <div className="flex items-center gap-2">
                                    <div className="size-7 bg-accent/10 rounded-lg flex items-center justify-center text-accent border border-accent/20">
                                        <Search size={16} />
                                    </div>
                                    <span className="text-xs font-black text-var(--text-primary) uppercase tracking-wide">Analiza Treści</span>
                                </div>
                                <div className="flex items-center gap-1.5 bg-success/10 text-success text-[9px] font-black px-2 py-1 rounded-md uppercase tracking-tighter border border-success/20">
                                    <Zap size={10} className="animate-pulse" /> Live Preview
                                </div>
                            </div>
                            
                            <div className="flex-1 overflow-y-auto p-6 bg-var(--bg-primary)/30 custom-scrollbar">
                                <div className="w-full bg-white shadow-xl border border-var(--border-secondary) p-10 preview-render font-serif text-[11px] min-h-[500px] rounded-lg">
                                    <div dangerouslySetInnerHTML={{ __html: currentTemplate.content || '<p class="text-slate-300 italic">Brak treści do wyświetlenia...</p>' }} />
                                    <div className="mt-16 text-center text-[9px] text-slate-400 border-t border-slate-100 pt-6">
                                        <div className="font-bold mb-1 uppercase tracking-widest text-slate-300">Weryfikacja Systemowa</div>
                                        <span className="opacity-50 text-slate-400 font-mono italic">ID-REF: {currentTemplate.id} • {new Date().toLocaleDateString('pl-PL')}</span>
                                    </div>
                                </div>

                                <div className="mt-6 space-y-4">
                                    <div className="bg-var(--bg-secondary) p-4 rounded-2xl border border-var(--border-secondary) shadow-md">
                                        <div className="flex justify-between items-end mb-3">
                                            <span className="text-[10px] font-bold text-var(--text-tertiary) uppercase tracking-wider">Stopień Skomplikowania</span>
                                            <span className="text-xs font-black text-accent uppercase">Medium (Lvl 3)</span>
                                        </div>
                                        <div className="h-1.5 w-full bg-var(--bg-primary) rounded-full overflow-hidden border border-var(--border-secondary)">
                                            <div className="h-full bg-accent rounded-full transition-all duration-1000 shadow-[0_0_8px_rgba(99,102,241,0.5)]" style={{ width: '65%' }}></div>
                                        </div>
                                    </div>
                                    
                                    <div className="grid grid-cols-2 gap-3">
                                        <div className="p-4 bg-var(--bg-secondary) rounded-2xl border border-var(--border-secondary) shadow-md flex flex-col gap-1">
                                            <span className="text-[10px] text-var(--text-tertiary) font-bold uppercase tracking-wider">Słowa</span>
                                            <span className="text-base font-black text-var(--text-primary) tracking-tighter">{stripHtml(currentTemplate.content).split(/\s+/).filter(Boolean).length}</span>
                                        </div>
                                        <div className="p-4 bg-var(--bg-secondary) rounded-2xl border border-var(--border-secondary) shadow-md flex flex-col gap-1">
                                            <span className="text-[10px] text-var(--text-tertiary) font-bold uppercase tracking-wider">Czytanie</span>
                                            <span className="text-base font-black text-var(--text-primary) tracking-tighter">~{Math.ceil(stripHtml(currentTemplate.content).split(/\s+/).filter(Boolean).length / 180)} min</span>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className="p-6 bg-var(--bg-tertiary) border-t border-var(--border-secondary)">
                                <button className="w-full h-12 bg-accent text-white rounded-xl flex items-center justify-center gap-3 font-black text-[11px] uppercase tracking-widest hover:brightness-110 transition-all shadow-lg shadow-accent/20 active:scale-[0.98]">
                                    <ChevronRight size={16} />
                                    <span>Uruchom Audyt Prawny AI</span>
                                </button>
                            </div>
                        </aside>
                    </main>
                </div>
            )}
        </div>
    );
}
