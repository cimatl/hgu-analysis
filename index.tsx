import React, { useState } from 'react';
import ReactDOM from 'react-dom/client';
import {
  RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, Radar, Legend,
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer
} from 'recharts';

const COLORS = { 박성진: '#3b82f6', 이정민: '#8b5cf6', 필요: '#10b981' };

const overallData = [
  { dimension: '신학적 깊이', 박성진: 1.5, 이정민: 1, 필요: 5 },
  { dimension: '교육철학', 박성진: 2.5, 이정민: 2, 필요: 5 },
  { dimension: '역사의식', 박성진: 4, 이정민: 2.5, 필요: 5 },
  { dimension: 'AGI/ASI 대비', 박성진: 1, 이정민: 1, 필요: 5 },
  { dimension: '실행력', 박성진: 4.5, 이정민: 3.5, 필요: 5 },
  { dimension: '비판적 성찰', 박성진: 2, 이정민: 1.5, 필요: 5 },
  { dimension: '정체성 형성', 박성진: 1.5, 이정민: 1, 필요: 5 },
  { dimension: '동적 행동 호', 박성진: 2, 이정민: 3, 필요: 5 },
];

const d6Data = [
  { stage: 'Receiver', 박성진: 2, 이정민: 1, 필요: 3 },
  { stage: 'Learner', 박성진: 0, 이정민: 0, 필요: 5 },
  { stage: 'Practitioner', 박성진: 1, 이정민: 1, 필요: 4 },
  { stage: 'Mentor', 박성진: 2, 이정민: 0, 필요: 5 },
  { stage: 'Architect', 박성진: 1, 이정민: 1, 필요: 4 },
];

const d7Data = [
  { stage: 'Attend', 박성진: 0, 이정민: 2, 필요: 5 },
  { stage: 'Regulate', 박성진: 0, 이정민: 4, 필요: 4 },
  { stage: 'Engage', 박성진: 2, 이정민: 0, 필요: 5 },
  { stage: 'Enact', 박성진: 1, 이정민: 2, 필요: 4 },
  { stage: 'Integrate', 박성진: 0, 이정민: 0, 필요: 5 },
];

const summaryData = [
  { name: '박성진', score: 2.2, color: COLORS.박성진, description: '높은 실행력과 역사의식을 갖추었으나 보완 필요.' },
  { name: '이정민', score: 1.9, color: COLORS.이정민, description: '행동 호(Arc) 잠재력이 있으나 역량 미달.' },
  { name: '필요 수준', score: 5.0, color: COLORS.필요, description: '한동 정체성 수호를 위한 최소 기준.' },
];

const App = () => {
  const [activeTab, setActiveTab] = useState('overview');
  const [isReportView, setIsReportView] = useState(false);

  const handlePrint = () => {
    setIsReportView(true);
    setTimeout(() => { window.print(); }, 150);
  };

  const TabButton = ({ id, label }) => (
    <button onClick={() => setActiveTab(id)} className={`flex-1 px-6 py-4 font-bold text-sm border-b-2 ${activeTab === id ? 'border-blue-600 text-blue-600 bg-blue-50' : 'border-transparent text-gray-500'}`}>{label}</button>
  );

  return (
    <div className="min-h-screen bg-slate-50 py-8 px-4 print:p-0 print:bg-white">
      <div className="max-w-7xl mx-auto">
        <div className="bg-white shadow-2xl rounded-3xl overflow-hidden print:shadow-none">
          <div className="bg-slate-900 text-white p-8 print:bg-white print:text-black print:border-b-2">
            <div className="flex justify-between items-center">
              <div><h1 className="text-3xl font-black">한동대학교 제8대 총장 후보 역량 비교</h1></div>
              <div className="flex gap-3 no-print">
                <button onClick={() => setIsReportView(!isReportView)} className="px-5 py-2.5 bg-slate-800 rounded-xl text-sm font-bold">{isReportView ? '탭 모드' : '전체 리포트'}</button>
                <button onClick={handlePrint} className="px-5 py-2.5 bg-blue-600 text-white rounded-xl text-sm font-bold">PDF 저장</button>
              </div>
            </div>
          </div>
          {!isReportView && (
            <div className="flex border-b no-print bg-white sticky top-0 z-10">
              <TabButton id="overview" label="종합 분석" /><TabButton id="d6" label="D6 형성" /><TabButton id="d7" label="D7 실행" /><TabButton id="analysis" label="제언" />
            </div>
          )}
          <div className="p-8">
            {(activeTab === 'overview' || isReportView) && (
              <section className="mb-16 animate-fadeIn">
                <h2 className="text-2xl font-black mb-8">종합 역량 포트폴리오</h2>
                <div className="grid lg:grid-cols-3 gap-10">
                  <div className="lg:col-span-2 h-[500px] bg-slate-50 rounded-3xl p-6">
                    <ResponsiveContainer width="100%" height="100%">
                      <RadarChart data={overallData}>
                        <PolarGrid /><PolarAngleAxis dataKey="dimension" /><PolarRadiusAxis domain={[0, 5]} />
                        <Radar name="박성진" dataKey="박성진" stroke={COLORS.박성진} fill={COLORS.박성진} fillOpacity={0.4} />
                        <Radar name="이정민" dataKey="이정민" stroke={COLORS.이정민} fill={COLORS.이정민} fillOpacity={0.4} />
                        <Legend />
                      </RadarChart>
                    </ResponsiveContainer>
                  </div>
                  <div className="flex flex-col gap-6">
                    {summaryData.map(item => (
                      <div key={item.name} className="p-6 rounded-2xl border-2 bg-white" style={{ borderColor: item.color + '20' }}>
                        <div className="flex justify-between mb-2"><span className="font-black text-gray-400">{item.name}</span><span className="text-2xl font-black" style={{ color: item.color }}>{item.score}</span></div>
                        <p className="text-gray-600 text-sm">{item.description}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </section>
            )}
          </div>
          <div className="bg-slate-50 p-10 text-center border-t">
            <h3 className="text-xl font-black mb-2">이사야 58:6-7</h3>
            <p className="text-slate-600 italic">"내가 기뻐하는 금식은 흉악의 결박을 풀어 주며..."</p>
          </div>
        </div>
      </div>
    </div>
  );
};

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<App />);
