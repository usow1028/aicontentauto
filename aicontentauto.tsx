import React, { useState, useEffect } from 'react';
import { ChevronDown, ChevronUp, Play, Download, Loader2, TrendingUp, FileText, Image, Video, Sparkles } from 'lucide-react';

const AIContentGenerator = () => {
  const [isGenerating, setIsGenerating] = useState(false);
  const [logExpanded, setLogExpanded] = useState(false);
  const [storyExpanded, setStoryExpanded] = useState(false);
  const [activeContentTypes, setActiveContentTypes] = useState({
    text: true,
    image: true,
    video: true
  });
  const [generationStep, setGenerationStep] = useState(0);
  const [trendData, setTrendData] = useState(null);
  const [storyData, setStoryData] = useState(null);
  const [generatedContent, setGeneratedContent] = useState({
    text: null,
    image: null,
    video: null
  });

  const steps = [
    "트렌드 데이터 수집 중...",
    "AI 분석 진행 중...",
    "스토리 기획 중...",
    "콘텐츠 생성 중..."
  ];

  const mockTrendData = {
    keywords: ["AI혁명", "디지털전환", "메타버스", "지속가능성", "개인화"],
    zeitgeist: "기술과 인간성의 조화를 추구하는 시대",
    sentiment: "미래에 대한 기대감과 불안감이 공존",
    desires: "진정성 있는 연결과 의미있는 경험 추구",
    platforms: {
      youtube: "AI 튜토리얼 급증 (+340%)",
      instagram: "지속가능한 라이프스타일 콘텐츠 인기",
      tiktok: "AI 활용 창작물 바이럴",
      twitter: "테크 윤리 토론 활발"
    }
  };

  const mockStoryData = {
    concept: "AI와 함께 꿈을 그리는 평범한 사람들의 비범한 이야기",
    narrative: "주인공은 AI 도구를 활용해 자신만의 창작물을 만들어가며 성장하는 현대인. 기술의 힘을 빌려 자신의 한계를 뛰어넘고, 진정한 자아를 발견해 나가는 여정을 그린다.",
    keywords: ["#AI크리에이터", "#디지털드림", "#창작혁명", "#기술과감성", "#미래일상"],
    relevance: "현재 AI 도구 활용이 급증하고 있으며, 개인 창작자들이 기술을 통해 새로운 가능성을 탐색하고 있는 시대정신과 완벽히 부합"
  };

  const handleGenerate = async () => {
    setIsGenerating(true);
    setGenerationStep(0);
    setTrendData(null);
    setStoryData(null);
    setGeneratedContent({ text: null, image: null, video: null });

    // Phase 1: 트렌드 데이터 수집
    setTimeout(() => {
      setGenerationStep(1);
      setTrendData(mockTrendData);
      setLogExpanded(true);
    }, 1500);

    // Phase 2: 스토리 기획
    setTimeout(() => {
      setGenerationStep(2);
      setStoryData(mockStoryData);
      setStoryExpanded(true);
    }, 3000);

    // Phase 3: 콘텐츠 생성
    setTimeout(async () => {
      setGenerationStep(3);
      await generateContent();
    }, 4500);
  };

  const generateContent = async () => {
    const content = { text: null, image: null, video: null };

    if (activeContentTypes.text) {
      try {
        const textPrompt = `다음 스토리 컨셉을 바탕으로 매력적인 웹소설 첫 화를 작성해주세요:
        
컨셉: ${mockStoryData.concept}
스토리: ${mockStoryData.narrative}
키워드: ${mockStoryData.keywords.join(', ')}

1000자 내외로 작성해주세요.`;

        const response = await window.claude.complete(textPrompt);
        content.text = response;
      } catch (error) {
        content.text = "AI 텍스트 생성 중 오류가 발생했습니다. 실제 구현 시 Claude API가 연동됩니다.";
      }
    }

    if (activeContentTypes.image) {
      content.image = "data:image/svg+xml;base64," + btoa(`
        <svg width="400" height="300" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <linearGradient id="bg" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" style="stop-color:#667eea;stop-opacity:1" />
              <stop offset="100%" style="stop-color:#764ba2;stop-opacity:1" />
            </linearGradient>
          </defs>
          <rect width="400" height="300" fill="url(#bg)"/>
          <circle cx="200" cy="150" r="80" fill="rgba(255,255,255,0.2)" stroke="white" stroke-width="2"/>
          <text x="200" y="155" text-anchor="middle" fill="white" font-size="16" font-family="Arial">AI 생성 이미지</text>
          <text x="200" y="175" text-anchor="middle" fill="white" font-size="12" font-family="Arial">실제 구현 시 DALL-E, Midjourney 등 연동</text>
        </svg>
      `);
    }

    if (activeContentTypes.video) {
      content.video = "비디오 생성 완료 (실제 구현 시 RunwayML, Pika Labs 등 API 연동)";
    }

    setGeneratedContent(content);
    setIsGenerating(false);
  };

  const downloadContent = (type, content) => {
    if (type === 'text') {
      const blob = new Blob([content], { type: 'text/plain' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = 'generated-story.txt';
      a.click();
      URL.revokeObjectURL(url);
    } else if (type === 'image') {
      const a = document.createElement('a');
      a.href = content;
      a.download = 'generated-image.png';
      a.click();
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900 p-6">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4 flex items-center justify-center gap-3">
            <Sparkles className="text-yellow-400" />
            AI 콘텐츠 자동 생성
            <Sparkles className="text-yellow-400" />
          </h1>
          <p className="text-blue-200 text-lg">트렌드 분석부터 콘텐츠 생성까지, 한 번의 클릭으로 완성하는 AI 파이프라인</p>
        </div>

        {/* Generate Button */}
        <div className="flex justify-center mb-8">
          <button
            onClick={handleGenerate}
            disabled={isGenerating}
            className="bg-gradient-to-r from-pink-500 to-purple-600 hover:from-pink-600 hover:to-purple-700 text-white font-bold py-4 px-8 rounded-2xl shadow-2xl transform transition-all duration-300 hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-3"
          >
            {isGenerating ? (
              <>
                <Loader2 className="animate-spin" size={24} />
                {steps[generationStep]}
              </>
            ) : (
              <>
                <Play size={24} />
                Generate
              </>
            )}
          </button>
        </div>

        {/* Log Section */}
        <div className="backdrop-blur-lg bg-white/10 rounded-2xl p-6 mb-6 shadow-2xl border border-white/20">
          <button
            onClick={() => setLogExpanded(!logExpanded)}
            className="flex items-center justify-between w-full text-white hover:text-blue-200 transition-colors"
          >
            <div className="flex items-center gap-3">
              <TrendingUp size={24} />
              <span className="text-xl font-semibold">Log - 트렌드 분석</span>
            </div>
            {logExpanded ? <ChevronUp size={24} /> : <ChevronDown size={24} />}
          </button>
          
          {logExpanded && trendData && (
            <div className="mt-4 space-y-4 text-white">
              <div className="grid md:grid-cols-2 gap-4">
                <div className="bg-white/5 rounded-lg p-4 border border-white/10">
                  <h3 className="font-semibold mb-2 text-yellow-300">핵심 키워드</h3>
                  <div className="flex flex-wrap gap-2">
                    {trendData.keywords.map((keyword, idx) => (
                      <span key={idx} className="bg-blue-500/30 px-3 py-1 rounded-full text-sm">
                        {keyword}
                      </span>
                    ))}
                  </div>
                </div>
                <div className="bg-white/5 rounded-lg p-4 border border-white/10">
                  <h3 className="font-semibold mb-2 text-yellow-300">시대정신</h3>
                  <p className="text-sm text-blue-200">{trendData.zeitgeist}</p>
                </div>
              </div>
              <div className="bg-white/5 rounded-lg p-4 border border-white/10">
                <h3 className="font-semibold mb-2 text-yellow-300">플랫폼별 트렌드</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-2 text-sm">
                  {Object.entries(trendData.platforms).map(([platform, trend]) => (
                    <div key={platform} className="flex justify-between">
                      <span className="capitalize font-medium">{platform}:</span>
                      <span className="text-blue-200">{trend}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Story Section */}
        <div className="backdrop-blur-lg bg-white/10 rounded-2xl p-6 mb-6 shadow-2xl border border-white/20">
          <button
            onClick={() => setStoryExpanded(!storyExpanded)}
            className="flex items-center justify-between w-full text-white hover:text-blue-200 transition-colors"
          >
            <div className="flex items-center gap-3">
              <FileText size={24} />
              <span className="text-xl font-semibold">Story - 스토리 기획</span>
            </div>
            {storyExpanded ? <ChevronUp size={24} /> : <ChevronDown size={24} />}
          </button>
          
          {storyExpanded && storyData && (
            <div className="mt-4 space-y-4 text-white">
              <div className="bg-white/5 rounded-lg p-4 border border-white/10">
                <h3 className="font-semibold mb-2 text-yellow-300">핵심 컨셉</h3>
                <p className="text-lg font-medium text-pink-300">{storyData.concept}</p>
              </div>
              <div className="bg-white/5 rounded-lg p-4 border border-white/10">
                <h3 className="font-semibold mb-2 text-yellow-300">스토리 내러티브</h3>
                <p className="text-blue-200">{storyData.narrative}</p>
              </div>
              <div className="grid md:grid-cols-2 gap-4">
                <div className="bg-white/5 rounded-lg p-4 border border-white/10">
                  <h3 className="font-semibold mb-2 text-yellow-300">해시태그</h3>
                  <div className="flex flex-wrap gap-2">
                    {storyData.keywords.map((keyword, idx) => (
                      <span key={idx} className="bg-green-500/30 px-3 py-1 rounded-full text-sm">
                        {keyword}
                      </span>
                    ))}
                  </div>
                </div>
                <div className="bg-white/5 rounded-lg p-4 border border-white/10">
                  <h3 className="font-semibold mb-2 text-yellow-300">트렌드 연관성</h3>
                  <p className="text-sm text-blue-200">{storyData.relevance}</p>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Content Generation Section */}
        <div className="grid md:grid-cols-3 gap-6">
          {/* Text Content */}
          <div className="backdrop-blur-lg bg-white/10 rounded-2xl p-6 shadow-2xl border border-white/20">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-3">
                <FileText size={24} className="text-blue-400" />
                <span className="text-xl font-semibold text-white">Text</span>
              </div>
              <button
                onClick={() => setActiveContentTypes(prev => ({ ...prev, text: !prev.text }))}
                className={`w-12 h-6 rounded-full transition-all duration-300 ${
                  activeContentTypes.text ? 'bg-green-500' : 'bg-gray-600'
                }`}
              >
                <div className={`w-5 h-5 bg-white rounded-full transition-transform duration-300 ${
                  activeContentTypes.text ? 'translate-x-6' : 'translate-x-1'
                }`} />
              </button>
            </div>
            
            {generatedContent.text && (
              <div className="space-y-4">
                <div className="bg-white/5 rounded-lg p-4 border border-white/10 max-h-40 overflow-y-auto">
                  <p className="text-sm text-blue-200 whitespace-pre-wrap">{generatedContent.text}</p>
                </div>
                <button
                  onClick={() => downloadContent('text', generatedContent.text)}
                  className="w-full bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded-lg transition-colors flex items-center justify-center gap-2"
                >
                  <Download size={16} />
                  다운로드
                </button>
              </div>
            )}
          </div>

          {/* Image Content */}
          <div className="backdrop-blur-lg bg-white/10 rounded-2xl p-6 shadow-2xl border border-white/20">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-3">
                <Image size={24} className="text-green-400" />
                <span className="text-xl font-semibold text-white">Image</span>
              </div>
              <button
                onClick={() => setActiveContentTypes(prev => ({ ...prev, image: !prev.image }))}
                className={`w-12 h-6 rounded-full transition-all duration-300 ${
                  activeContentTypes.image ? 'bg-green-500' : 'bg-gray-600'
                }`}
              >
                <div className={`w-5 h-5 bg-white rounded-full transition-transform duration-300 ${
                  activeContentTypes.image ? 'translate-x-6' : 'translate-x-1'
                }`} />
              </button>
            </div>
            
            {generatedContent.image && (
              <div className="space-y-4">
                <div className="bg-white/5 rounded-lg p-4 border border-white/10">
                  <img 
                    src={generatedContent.image} 
                    alt="Generated content" 
                    className="w-full h-32 object-cover rounded-lg"
                  />
                </div>
                <button
                  onClick={() => downloadContent('image', generatedContent.image)}
                  className="w-full bg-green-500 hover:bg-green-600 text-white py-2 px-4 rounded-lg transition-colors flex items-center justify-center gap-2"
                >
                  <Download size={16} />
                  다운로드
                </button>
              </div>
            )}
          </div>

          {/* Video Content */}
          <div className="backdrop-blur-lg bg-white/10 rounded-2xl p-6 shadow-2xl border border-white/20">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-3">
                <Video size={24} className="text-purple-400" />
                <span className="text-xl font-semibold text-white">Video</span>
              </div>
              <button
                onClick={() => setActiveContentTypes(prev => ({ ...prev, video: !prev.video }))}
                className={`w-12 h-6 rounded-full transition-all duration-300 ${
                  activeContentTypes.video ? 'bg-green-500' : 'bg-gray-600'
                }`}
              >
                <div className={`w-5 h-5 bg-white rounded-full transition-transform duration-300 ${
                  activeContentTypes.video ? 'translate-x-6' : 'translate-x-1'
                }`} />
              </button>
            </div>
            
            {generatedContent.video && (
              <div className="space-y-4">
                <div className="bg-white/5 rounded-lg p-4 border border-white/10">
                  <div className="w-full h-32 bg-gradient-to-r from-purple-500 to-pink-500 rounded-lg flex items-center justify-center">
                    <div className="text-center text-white">
                      <Video size={32} className="mx-auto mb-2" />
                      <p className="text-sm">{generatedContent.video}</p>
                    </div>
                  </div>
                </div>
                <button
                  className="w-full bg-purple-500 hover:bg-purple-600 text-white py-2 px-4 rounded-lg transition-colors flex items-center justify-center gap-2"
                >
                  <Download size={16} />
                  다운로드
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AIContentGenerator;