'use client'

const Loading = () => {
  return (
    <div className="fixed pt-25 inset-0 overflow-y-auto bg-black text-gray-100 font-montserrat">
      <div className="w-full max-w-4xl mx-auto py-10 px-4">
        {/* Header section (avatar + name + date) */}
        <div className="flex items-center gap-3 mb-6 animate-pulse">
          <div className="w-12 h-12 rounded-full bg-gray-700" />
          <div className="flex flex-col gap-2">
            <div className="w-32 h-4 bg-gray-700 rounded" />
            <div className="w-20 h-3 bg-gray-700 rounded" />
          </div>
        </div>

        {/* Title */}
        <div className="w-3/4 h-8 bg-gray-700 rounded mb-4 animate-pulse" />

        {/* Content box */}
        <div className="bg-[#1a1a1a] rounded-2xl p-6 shadow-md border border-gray-800 animate-pulse">
          <div className="flex flex-col gap-3">
            <div className="w-full h-4 bg-gray-700 rounded" />
            <div className="w-5/6 h-4 bg-gray-700 rounded" />
            <div className="w-2/3 h-4 bg-gray-700 rounded" />
            <div className="w-3/4 h-4 bg-gray-700 rounded" />
          </div>
        </div>

        {/* Interactions section */}
        <div className="flex items-center justify-end gap-6 mt-6 animate-pulse">
          <div className="w-16 h-6 bg-gray-700 rounded" />
          <div className="w-16 h-6 bg-gray-700 rounded" />
          <div className="w-16 h-6 bg-gray-700 rounded" />
        </div>
      </div>
    </div>
  )
}

export default Loading
