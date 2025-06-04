import { useState } from 'react';
import { trpc } from '../../utils/trpc';
import FileUpload from '../../components/FileUpload';

export default function NewEntryPage() {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [imageUrl, setImageUrl] = useState('');
  const [audioUrl, setAudioUrl] = useState('');
  const [aiProvider, setAiProvider] = useState<'deepseek' | 'azure'>('deepseek');
  const [aiResult, setAiResult] = useState('');
  const [aiLoading, setAiLoading] = useState(false);
  const [aiType, setAiType] = useState<'summary' | 'beautify' | null>(null);

  const createEntry = trpc.createEntry.useMutation({
    onSuccess: () => {
      setTitle('');
      setDescription('');
      setImageUrl('');
      setAudioUrl('');
      setAiResult('');
    },
  });

  const summarizeMemoir = trpc.summarizeMemoir.useMutation();
  const beautifyMemoir = trpc.beautifyMemoir.useMutation();

  const handleAiClick = async (type: 'summary' | 'beautify') => {
    setAiType(type);
    setAiLoading(true);
    setAiResult('');
    try {
      if (type === 'summary') {
        const res = await summarizeMemoir.mutateAsync({ text: description, provider: aiProvider });
        setAiResult(res);
      } else {
        const res = await beautifyMemoir.mutateAsync({ text: description, provider: aiProvider });
        setAiResult(res);
      }
    } catch (e) {
      setAiResult('AI 处理失败，请重试');
    } finally {
      setAiLoading(false);
    }
  };

  const handleUseAiResult = () => {
    if (aiType === 'summary') setTitle(aiResult);
    if (aiType === 'beautify') setDescription(aiResult);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!imageUrl || !audioUrl) {
      alert('Please upload both image and audio');
      return;
    }
    await createEntry.mutateAsync({ title, description, imageUrl, audioUrl });
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">New Memory</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block mb-1">Title</label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="w-full p-2 border rounded"
            required
          />
        </div>
        <div>
          <label className="block mb-1">Description</label>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="w-full p-2 border rounded"
            required
          />
          <div className="flex items-center gap-2 mt-2">
            <select
              value={aiProvider}
              onChange={e => setAiProvider(e.target.value as 'deepseek' | 'azure')}
              className="border rounded p-1 text-sm"
            >
              <option value="deepseek">DeepSeek</option>
              <option value="azure">Azure GPT</option>
            </select>
            <button
              type="button"
              className="bg-gray-200 px-2 py-1 rounded text-sm"
              onClick={() => handleAiClick('summary')}
              disabled={aiLoading}
            >
              AI摘要
            </button>
            <button
              type="button"
              className="bg-gray-200 px-2 py-1 rounded text-sm"
              onClick={() => handleAiClick('beautify')}
              disabled={aiLoading}
            >
              AI美化
            </button>
            {aiLoading && <span className="text-xs text-gray-500 ml-2">AI处理中...</span>}
          </div>
          {aiResult && (
            <div className="mt-2 bg-gray-50 border p-2 rounded">
              <div className="flex items-center justify-between">
                <span className="text-xs text-gray-500">AI结果：</span>
                <button type="button" className="text-xs text-blue-500" onClick={handleUseAiResult}>
                  {aiType === 'summary' ? '用作标题' : '替换正文'}
                </button>
              </div>
              <div className="text-sm mt-1 whitespace-pre-line">{aiResult}</div>
            </div>
          )}
        </div>
        <FileUpload
          onUploadComplete={setImageUrl}
          accept="image/*"
          bucket="images"
          label="Upload Image"
        />
        {imageUrl && (
          <div className="mt-2">
            <img src={imageUrl} alt="Preview" className="w-32 h-32 object-cover rounded" />
          </div>
        )}
        <FileUpload
          onUploadComplete={setAudioUrl}
          accept="audio/*"
          bucket="audio"
          label="Upload Audio"
        />
        {audioUrl && (
          <div className="mt-2">
            <audio src={audioUrl} controls className="w-full" />
          </div>
        )}
        <button
          type="submit"
          disabled={createEntry.isPending}
          className="bg-blue-500 text-white p-2 rounded disabled:bg-blue-300"
        >
          {createEntry.isPending ? 'Creating...' : 'Create Memory'}
        </button>
      </form>
    </div>
  );
} 