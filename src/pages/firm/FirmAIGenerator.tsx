import { useState } from 'react';
import { Brain, Sparkles, Copy, FileDown, Loader2 } from 'lucide-react';

const docTypes = [
    { id: 'pozew', label: 'Pozew cywilny' },
    { id: 'apelacja', label: 'Apelacja' },
    { id: 'wniosek', label: 'Wniosek procesowy' },
    { id: 'umowa', label: 'Umowa cywilnoprawna' },
    { id: 'pismo', label: 'Pismo ogólne' },
    { id: 'odwolanie', label: 'Odwołanie od decyzji' },
];

const models = [
    { id: 'gpt4o', label: 'GPT-4o', provider: 'OpenAI' },
    { id: 'claude35', label: 'Claude 3.5 Sonnet', provider: 'Anthropic' },
    { id: 'deepseek', label: 'DeepSeek V3', provider: 'DeepSeek' },
];

const sampleOutput = `POZEW O ZAPŁATĘ

W imieniu powoda — Maria Zielińska (PESEL: ...), zamieszkała w Warszawie, 
ul. Przykładowa 10/5, 00-001 Warszawa

przeciwko pozwanemu — XYZ Sp. z o.o., z siedzibą w Krakowie,
ul. Biznesowa 20, 30-001 Kraków, KRS: 0000123456

Na podstawie art. 187 § 1 k.p.c. wnoszę o:

1. Zasądzenie od pozwanego na rzecz powoda kwoty 15.000,00 zł (piętnaście tysięcy złotych) wraz z odsetkami ustawowymi za opóźnienie od dnia 01.01.2026 r. do dnia zapłaty;

2. Zasądzenie od pozwanego na rzecz powoda kosztów procesu, w tym kosztów zastępstwa procesowego według norm przepisanych.

UZASADNIENIE

Powód zawarł z pozwanym umowę o świadczenie usług nr UX/2025/789 z dnia 01.06.2025 r. Na mocy przedmiotowej umowy pozwany zobowiązał się do...

[Dokument wygenerowany przez AI – wymaga weryfikacji prawnika]`;

export default function FirmAIGenerator() {
    const [docType, setDocType] = useState('pozew');
    const [model, setModel] = useState('gpt4o');
    const [context, setContext] = useState('');
    const [generating, setGenerating] = useState(false);
    const [output, setOutput] = useState('');

    const handleGenerate = () => {
        setGenerating(true);
        setOutput('');
        setTimeout(() => {
            setOutput(sampleOutput);
            setGenerating(false);
        }, 2500);
    };

    return (
        <div className="animate-in">
            <div className="page-header">
                <div>
                    <h2>Generator pism AI</h2>
                    <p className="page-header-sub">Generowanie dokumentów prawnych z wykorzystaniem sztucznej inteligencji</p>
                </div>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 24 }}>
                {/* Input panel */}
                <div className="card" style={{ display: 'flex', flexDirection: 'column' }}>
                    <div className="card-header"><span className="card-title"><Brain size={16} style={{ marginRight: 8 }} />Konfiguracja</span></div>
                    <div style={{ padding: '16px', display: 'flex', flexDirection: 'column', gap: 16, flex: 1 }}>
                        <div className="form-group">
                            <label>Typ dokumentu</label>
                            <select value={docType} onChange={e => setDocType(e.target.value)}>
                                {docTypes.map(d => <option key={d.id} value={d.id}>{d.label}</option>)}
                            </select>
                        </div>
                        <div className="form-group">
                            <label>Model AI</label>
                            <select value={model} onChange={e => setModel(e.target.value)}>
                                {models.map(m => <option key={m.id} value={m.id}>{m.label} ({m.provider})</option>)}
                            </select>
                        </div>
                        <div className="form-group" style={{ flex: 1 }}>
                            <label>Kontekst sprawy</label>
                            <textarea
                                value={context}
                                onChange={e => setContext(e.target.value)}
                                placeholder="Opisz stan faktyczny, żądania klienta, istotne okoliczności..."
                                style={{ minHeight: 200, resize: 'vertical' }}
                            />
                        </div>
                        <button className="btn btn-primary" onClick={handleGenerate} disabled={generating} style={{ gap: 8 }}>
                            {generating ? <><Loader2 size={16} className="spin" /> Generowanie...</> : <><Sparkles size={16} /> Generuj dokument</>}
                        </button>
                    </div>
                </div>

                {/* Output panel */}
                <div className="card" style={{ display: 'flex', flexDirection: 'column' }}>
                    <div className="card-header">
                        <span className="card-title"><FileDown size={16} style={{ marginRight: 8 }} />Wygenerowany dokument</span>
                        {output && (
                            <div style={{ display: 'flex', gap: 8 }}>
                                <button className="btn btn-ghost btn-sm" onClick={() => navigator.clipboard.writeText(output)}><Copy size={13} /> Kopiuj</button>
                                <button className="btn btn-secondary btn-sm"><FileDown size={13} /> Pobierz DOCX</button>
                            </div>
                        )}
                    </div>
                    <div style={{ padding: '20px', flex: 1, fontSize: 13, lineHeight: 1.7, whiteSpace: 'pre-wrap', fontFamily: 'monospace', color: output ? 'var(--text-primary)' : 'var(--text-tertiary)' }}>
                        {generating ? (
                            <div style={{ textAlign: 'center', paddingTop: 80 }}>
                                <Loader2 size={32} className="spin" style={{ margin: '0 auto 16px', display: 'block', color: 'var(--accent)' }} />
                                <div style={{ fontFamily: 'var(--font-sans)' }}>AI analizuje kontekst i generuje dokument...</div>
                                <div style={{ fontSize: 12, color: 'var(--text-tertiary)', marginTop: 4, fontFamily: 'var(--font-sans)' }}>Model: {models.find(m => m.id === model)?.label}</div>
                            </div>
                        ) : output ? output : (
                            <div style={{ textAlign: 'center', paddingTop: 80, fontFamily: 'var(--font-sans)' }}>
                                <Sparkles size={32} style={{ margin: '0 auto 16px', display: 'block', opacity: 0.3 }} />
                                Tutaj pojawi się wygenerowany dokument.
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}
