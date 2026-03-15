export default function Home() {
  return (
    <main className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-100">
      <div className="text-center p-8">
        <h1 className="text-4xl font-bold text-indigo-700 mb-4">
          DorjeX AI Tutor
        </h1>
        <p className="text-xl text-gray-600 mb-8">
          Học AI từ cơ bản đến nâng cao với trợ lý AI thông minh
        </p>
        <div className="grid grid-cols-3 gap-4 max-w-lg mx-auto text-sm text-gray-500">
          <div className="bg-white rounded-lg p-4 shadow">
            <div className="text-2xl mb-2">📚</div>
            <div>23 Modules</div>
          </div>
          <div className="bg-white rounded-lg p-4 shadow">
            <div className="text-2xl mb-2">🤖</div>
            <div>AI Tutor</div>
          </div>
          <div className="bg-white rounded-lg p-4 shadow">
            <div className="text-2xl mb-2">🎯</div>
            <div>Quizzes</div>
          </div>
        </div>
      </div>
    </main>
  );
}
