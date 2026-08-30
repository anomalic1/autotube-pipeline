import React, { useState, useRef } from 'react';
import { UploadCloud, FileText, Loader2, MonitorPlay, Clock, Lock, Sparkles, CheckCircle2, Settings } from 'lucide-react';

type ProcessState = 'idle' | 'processing' | 'review';

export default function Dashboard() {
  const [appState, setAppState] = useState<ProcessState>('idle');
  const [selectedTitle, setSelectedTitle] = useState<number>(0);
  
  const [showSettings, setShowSettings] = useState(false);
  const [apiUrl, setApiUrl] = useState(() => sessionStorage.getItem('apiUrl') || 'https://api.openai.com/v1/chat/completions');
  const [apiKey, setApiKey] = useState(() => sessionStorage.getItem('apiKey') || '');

  // File state
  const [videoFile, setVideoFile] = useState<File | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [isDragging, setIsDragging] = useState(false);

  // Generated Data
  const [generatedTitles, setGeneratedTitles] = useState<string[]>([]);
  const [generatedDescription, setGeneratedDescription] = useState('');

  const saveSettings = (e: React.FormEvent) => {
    e.preventDefault();
    sessionStorage.setItem('apiUrl', apiUrl);
    sessionStorage.setItem('apiKey', apiKey);
    setShowSettings(false);
  };

  const processFiles = async (files: FileList) => {
    let transcriptText = '';
    
    for (let i = 0; i < files.length; i++) {
      const file = files[i];
      if (file.type.startsWith('video/')) {
        setVideoFile(file);
      } else if (file.name.endsWith('.txt') || file.name.endsWith('.md')) {
        transcriptText = await file.text();
      }
    }

    if (!transcriptText) {
      alert("Please upload a transcript file (.txt or .md)");
      return;
    }
    if (!apiKey) {
      alert("Please configure your API Key in Settings first.");
      setShowSettings(true);
      return;
    }

    setAppState('processing');

    try {
      const response = await fetch(apiUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${apiKey}`
        },
        body: JSON.stringify({
          model: "gpt-3.5-turbo", // Default, might be ignored by some APIs
          messages: [
            { role: "system", content: "You are an expert YouTube strategist. Given a transcript, generate exactly 3 high-converting, click-worthy titles and a detailed SEO description (including timestamps if you can infer them or placeholder chapters). Format output strictly as JSON with keys: 'titles' (array of strings) and 'description' (string)." },
            { role: "user", content: `Transcript: ${transcriptText.substring(0, 15000)}` }
          ],
          response_format: { type: "json_object" }
        })
      });

      if (!response.ok) throw new Error("API Request failed");
      const data = await response.json();
      const content = JSON.parse(data.choices[0].message.content);
      
      setGeneratedTitles(content.titles || ["Title 1", "Title 2", "Title 3"]);
      setGeneratedDescription(content.description || "Description generated.");
      setAppState('review');
    } catch (err) {
      console.error(err);
      alert("Error generating metadata. Check API URL and Key, or CORS issues.");
      setAppState('idle');
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      processFiles(e.dataTransfer.files);
    }
  };

  return (
    <div className="min-h-screen bg-zinc-950 text-zinc-100 selection:bg-indigo-500/30 p-6 md:p-12 font-sans flex justify-center">
      <div className="max-w-5xl w-full space-y-8">
        
        {/* Header */}
        <header className="flex items-center justify-between border-b border-zinc-800 pb-6">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center shadow-[0_0_20px_rgba(99,102,241,0.4)]">
              <MonitorPlay className="w-6 h-6 text-white" />
            </div>
            <h1 className="text-2xl font-bold tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-zinc-100 to-zinc-400">
              AutoTube Pipeline
            </h1>
          </div>
          <div className="flex items-center space-x-4 text-sm font-medium">
            <button onClick={() => setShowSettings(true)} className="p-2 rounded-lg bg-zinc-800/50 hover:bg-zinc-700/50 text-zinc-400 transition-colors">
              <Settings className="w-5 h-5" />
            </button>
            <span className="flex items-center text-emerald-400 bg-emerald-400/10 px-3 py-1 rounded-full border border-emerald-400/20">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse mr-2"></span>
              Edge Active
            </span>
          </div>
        </header>

        {/* State 1: Dropzone */}
        {appState === 'idle' && (
          <div className="animate-in fade-in zoom-in duration-500 flex flex-col items-center justify-center pt-12">
            <div 
              className="w-full max-w-3xl relative group"
              onDragOver={(e) => { e.preventDefault(); setIsDragging(true); }}
              onDragLeave={() => setIsDragging(false)}
              onDrop={handleDrop}
            >
              <div className={`absolute -inset-1 bg-gradient-to-r from-indigo-500 to-purple-600 rounded-3xl blur transition duration-1000 ${isDragging ? 'opacity-70' : 'opacity-25 group-hover:opacity-40 group-hover:duration-200'}`}></div>
              <div className={`relative p-12 bg-zinc-900/80 backdrop-blur-xl border rounded-3xl flex flex-col items-center text-center border-dashed transition-colors ${isDragging ? 'border-indigo-400' : 'border-zinc-800 group-hover:border-indigo-500/50'}`}>
                <div className="w-20 h-20 bg-zinc-800/50 rounded-full flex items-center justify-center mb-6 border border-zinc-700/50">
                  <UploadCloud className="w-10 h-10 text-indigo-400 group-hover:scale-110 transition-transform duration-300" />
                </div>
                <h3 className="text-2xl font-semibold mb-2">Initialize Pipeline</h3>
                <p className="text-zinc-400 max-w-md mb-8">
                  Drag and drop your video file (.mp4) and transcript (.txt/.md) here to begin AI metadata generation.
                </p>
                <div className="flex gap-4">
                  <input 
                    type="file" 
                    multiple 
                    className="hidden" 
                    ref={fileInputRef} 
                    onChange={(e) => e.target.files && processFiles(e.target.files)} 
                  />
                  <button onClick={() => fileInputRef.current?.click()} className="px-6 py-3 rounded-full bg-zinc-100 text-zinc-900 font-semibold hover:bg-white transition-colors">
                    Browse Files
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* State 2: AI Processing */}
        {appState === 'processing' && (
          <div className="animate-in fade-in duration-500 flex flex-col items-center justify-center py-32 space-y-8">
            <div className="relative">
              <div className="absolute inset-0 bg-indigo-500 blur-[32px] opacity-20 animate-pulse"></div>
              <Loader2 className="w-16 h-16 text-indigo-400 animate-spin relative z-10" />
            </div>
            <div className="text-center space-y-2">
              <h3 className="text-xl font-medium flex items-center justify-center gap-2">
                <Sparkles className="w-5 h-5 text-purple-400" />
                Synthesizing Metadata...
              </h3>
              <p className="text-zinc-500 text-sm animate-pulse">Analyzing transcript and generating SEO-optimized titles</p>
            </div>
          </div>
        )}

        {/* State 3: Review Dashboard */}
        {appState === 'review' && (
          <div className="animate-in slide-in-from-bottom-4 fade-in duration-700 grid grid-cols-1 lg:grid-cols-12 gap-8">
            
            {/* Left Column: Metadata Editor */}
            <div className="lg:col-span-8 space-y-6">
              
              {/* Title Selection */}
              <div className="bg-zinc-900/50 backdrop-blur-md border border-zinc-800/80 rounded-2xl p-6">
                <h2 className="text-lg font-semibold mb-4 flex items-center gap-2">
                  <Sparkles className="w-5 h-5 text-indigo-400" />
                  Select a High-Converting Title
                </h2>
                <div className="space-y-3">
                  {generatedTitles.map((title, idx) => (
                    <label key={idx} className={`relative flex cursor-pointer rounded-xl border p-4 transition-all hover:bg-zinc-800/50 ${selectedTitle === idx ? 'border-indigo-500 bg-indigo-500/10 shadow-[0_0_15px_rgba(99,102,241,0.15)]' : 'border-zinc-800'}`}>
                      <input 
                        type="radio" 
                        name="title" 
                        className="sr-only" 
                        checked={selectedTitle === idx} 
                        onChange={() => setSelectedTitle(idx)}
                      />
                      <span className="flex flex-1">
                        <span className="flex flex-col">
                          <span className="block text-sm font-medium text-zinc-200">{title}</span>
                        </span>
                      </span>
                      <CheckCircle2 className={`w-5 h-5 ${selectedTitle === idx ? 'text-indigo-400' : 'text-zinc-700'}`} />
                    </label>
                  ))}
                </div>
              </div>

              {/* Description Editor */}
              <div className="bg-zinc-900/50 backdrop-blur-md border border-zinc-800/80 rounded-2xl p-6 flex flex-col h-[500px]">
                <h2 className="text-lg font-semibold mb-4 flex items-center gap-2">
                  <FileText className="w-5 h-5 text-indigo-400" />
                  SEO Description & Chapters
                </h2>
                <textarea 
                  className="flex-1 w-full bg-zinc-950 border border-zinc-800 rounded-xl p-4 text-sm text-zinc-300 focus:ring-2 focus:ring-indigo-500 focus:border-transparent outline-none resize-none transition-shadow custom-scrollbar"
                  defaultValue={generatedDescription}
                />
                <div className="mt-4 pt-4 border-t border-zinc-800 flex items-center gap-4">
                   <div className="flex-1">
                      <label className="text-xs text-zinc-500 mb-1 block">Tags (comma separated)</label>
                      <input 
                        type="text" 
                        defaultValue="AI, YouTube Automation, Cloudflare Pages, Vite, React"
                        className="w-full bg-zinc-950 border border-zinc-800 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-indigo-500 outline-none"
                      />
                   </div>
                </div>
              </div>
            </div>

            {/* Right Column: Publishing Pipeline */}
            <div className="lg:col-span-4 space-y-6">
              <div className="bg-zinc-900/50 backdrop-blur-md border border-zinc-800/80 rounded-2xl p-6 sticky top-6">
                <h2 className="text-lg font-semibold mb-6">Publishing Pipeline</h2>
                
                <div className="space-y-6 mb-8">
                  {/* Visibility Setting */}
                  <div className="space-y-3">
                    <label className="text-sm font-medium text-zinc-400">Visibility</label>
                    <div className="grid grid-cols-2 gap-3">
                      <button className="flex flex-col items-center justify-center p-3 rounded-xl border border-indigo-500 bg-indigo-500/10 text-indigo-300">
                        <Lock className="w-5 h-5 mb-1" />
                        <span className="text-xs">Private</span>
                      </button>
                      <button className="flex flex-col items-center justify-center p-3 rounded-xl border border-zinc-800 hover:bg-zinc-800/50 text-zinc-400 transition-colors">
                        <Clock className="w-5 h-5 mb-1" />
                        <span className="text-xs">Schedule</span>
                      </button>
                    </div>
                  </div>
                  
                  {/* Status checklist */}
                  <div className="space-y-2 text-sm bg-zinc-950 p-4 rounded-xl border border-zinc-800/50">
                    <div className="flex items-center justify-between text-emerald-400">
                      <span className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4" /> Video File</span>
                      <span className="text-xs truncate max-w-[120px]">{videoFile ? videoFile.name : 'Unknown.mp4'}</span>
                    </div>
                    <div className="flex items-center justify-between text-emerald-400">
                      <span className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4" /> Metadata</span>
                      <span className="text-xs">Ready</span>
                    </div>
                    <div className="flex items-center justify-between text-zinc-500">
                      <span className="flex items-center gap-2"><Lock className="w-4 h-4" /> Auth Status</span>
                      <span className="text-xs">Not Linked</span>
                    </div>
                  </div>
                </div>

                <button className="w-full relative group">
                  <div className="absolute -inset-1 bg-gradient-to-r from-red-500 to-indigo-600 rounded-xl blur opacity-60 group-hover:opacity-100 transition duration-200"></div>
                  <div className="relative w-full bg-zinc-900 border border-zinc-700 px-6 py-4 rounded-xl flex items-center justify-center gap-3 hover:bg-zinc-800 transition-colors">
                    <MonitorPlay className="w-5 h-5 text-red-500 group-hover:scale-110 transition-transform" />
                    <span className="font-semibold tracking-wide text-zinc-100">Push to YouTube</span>
                  </div>
                </button>
                <p className="text-xs text-center text-zinc-600 mt-4">
                  Powered by Cloudflare Edge & YouTube Data API
                </p>
              </div>
            </div>

          </div>
        )}

        {/* Settings Modal */}
        {showSettings && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm">
            <div className="bg-zinc-900 border border-zinc-800 p-8 rounded-2xl w-full max-w-md">
              <h2 className="text-xl font-bold mb-4">API Settings</h2>
              <form onSubmit={saveSettings} className="space-y-4">
                <div>
                  <label className="block text-sm text-zinc-400 mb-1">API URL</label>
                  <input 
                    type="url" 
                    value={apiUrl}
                    onChange={(e) => setApiUrl(e.target.value)}
                    className="w-full bg-zinc-950 border border-zinc-800 rounded-lg px-4 py-2 focus:ring-2 focus:ring-indigo-500 outline-none" 
                    required 
                  />
                </div>
                <div>
                  <label className="block text-sm text-zinc-400 mb-1">API Key</label>
                  <input 
                    type="password" 
                    value={apiKey}
                    onChange={(e) => setApiKey(e.target.value)}
                    className="w-full bg-zinc-950 border border-zinc-800 rounded-lg px-4 py-2 focus:ring-2 focus:ring-indigo-500 outline-none" 
                    placeholder="sk-..."
                  />
                </div>
                <div className="flex justify-end gap-3 pt-4">
                  <button type="button" onClick={() => setShowSettings(false)} className="px-4 py-2 rounded-lg text-zinc-400 hover:text-white transition-colors">Cancel</button>
                  <button type="submit" className="px-4 py-2 rounded-lg bg-indigo-600 hover:bg-indigo-500 text-white font-medium transition-colors">Save</button>
                </div>
              </form>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
