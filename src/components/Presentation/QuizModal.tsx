import React, { useState } from 'react';
import { X, CheckCircle2, AlertCircle, Award, RotateCcw } from 'lucide-react';
import { QUIZ_QUESTIONS } from '../../data/slidesData';

interface QuizModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const QuizModal: React.FC<QuizModalProps> = ({ isOpen, onClose }) => {
  const [answers, setAnswers] = useState<Record<number, number>>({});
  const [submitted, setSubmitted] = useState<boolean>(false);

  if (!isOpen) return null;

  const handleSelectOption = (questionId: number, optionIndex: number) => {
    if (submitted) return;
    setAnswers((prev) => ({ ...prev, [questionId]: optionIndex }));
  };

  const calculateScore = () => {
    let score = 0;
    QUIZ_QUESTIONS.forEach((q) => {
      if (answers[q.id] === q.correctIndex) {
        score += 1;
      }
    });
    return score;
  };

  const handleReset = () => {
    setAnswers({});
    setSubmitted(false);
  };

  const score = calculateScore();
  const percentage = Math.round((score / QUIZ_QUESTIONS.length) * 100);

  return (
    <div className="fixed inset-0 z-50 bg-black/85 backdrop-blur-sm flex items-center justify-center p-4 select-none">
      <div className="bg-slate-950 border border-slate-800 rounded-2xl w-full max-w-3xl max-h-[90vh] flex flex-col shadow-2xl overflow-hidden">
        {/* Header */}
        <div className="p-5 border-b border-slate-800 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Award className="w-5 h-5 text-cyan-400" />
            <div>
              <h3 className="text-base font-bold font-mono text-white">CubeSat Telemetry Knowledge Check</h3>
              <span className="text-xs text-slate-400 font-mono">{QUIZ_QUESTIONS.length} Questions · Avionics & Protocols</span>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content list */}
        <div className="p-5 overflow-y-auto space-y-6">
          {submitted && (
            <div className="bg-slate-900 border border-cyan-500/40 rounded-xl p-4 text-center font-mono">
              <span className="text-xs uppercase text-slate-400 tracking-wider">Evaluation Score</span>
              <div className="text-3xl font-bold text-cyan-400 mt-1">
                {score} / {QUIZ_QUESTIONS.length} ({percentage}%)
              </div>
              <p className="text-xs text-slate-300 mt-1">
                {percentage >= 80 ? 'Mastery! Ready for flight certification & viva defense.' : 'Good attempt! Review the slides and formulas to strengthen weak areas.'}
              </p>
            </div>
          )}

          {QUIZ_QUESTIONS.map((q, idx) => {
            const selectedOpt = answers[q.id];
            const isCorrect = selectedOpt === q.correctIndex;

            return (
              <div key={q.id} className="bg-slate-900/60 border border-slate-800 rounded-xl p-4 font-mono text-xs">
                <div className="flex items-start gap-2 mb-3">
                  <span className="text-cyan-400 font-bold shrink-0">Q{idx + 1}.</span>
                  <span className="text-slate-100 font-medium leading-relaxed">{q.question}</span>
                </div>

                <div className="space-y-2">
                  {q.options.map((opt, optIdx) => {
                    let optionStyle = 'bg-slate-950 border-slate-800 text-slate-300 hover:border-slate-700';

                    if (submitted) {
                      if (optIdx === q.correctIndex) {
                        optionStyle = 'bg-emerald-950/60 border-emerald-500 text-emerald-300 font-bold';
                      } else if (selectedOpt === optIdx) {
                        optionStyle = 'bg-rose-950/60 border-rose-500 text-rose-300 line-through';
                      }
                    } else if (selectedOpt === optIdx) {
                      optionStyle = 'bg-cyan-950/60 border-cyan-400 text-cyan-200 font-semibold';
                    }

                    return (
                      <button
                        key={optIdx}
                        onClick={() => handleSelectOption(q.id, optIdx)}
                        className={`w-full text-left p-2.5 rounded-lg border transition-all flex items-center justify-between ${optionStyle}`}
                      >
                        <span>{opt}</span>
                        {submitted && optIdx === q.correctIndex && (
                          <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                        )}
                        {submitted && selectedOpt === optIdx && optIdx !== q.correctIndex && (
                          <AlertCircle className="w-4 h-4 text-rose-400 shrink-0" />
                        )}
                      </button>
                    );
                  })}
                </div>

                {submitted && (
                  <div className="mt-3 pt-2.5 border-t border-slate-800/80 text-[11px] text-slate-400">
                    <strong className="text-cyan-400">Explanation: </strong>
                    {q.explanation}
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Footer actions */}
        <div className="p-4 border-t border-slate-800 flex items-center justify-between bg-slate-950">
          <button
            onClick={handleReset}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-slate-800 text-slate-400 hover:text-white text-xs font-mono"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            Reset
          </button>

          {!submitted ? (
            <button
              onClick={() => setSubmitted(true)}
              disabled={Object.keys(answers).length === 0}
              className="px-4 py-1.5 rounded-lg bg-cyan-500 hover:bg-cyan-400 disabled:opacity-50 text-slate-950 text-xs font-mono font-bold"
            >
              Submit Quiz ({Object.keys(answers).length}/{QUIZ_QUESTIONS.length})
            </button>
          ) : (
            <button
              onClick={onClose}
              className="px-4 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-white text-xs font-mono"
            >
              Close & Return to Presentation
            </button>
          )}
        </div>
      </div>
    </div>
  );
};
