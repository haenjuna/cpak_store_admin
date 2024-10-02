
function AdminProductRegisterCompnent() {
    return (
        <div className="flex items-center justify-center h-screen p-6 sm:p-12">
            <div className="w-full md:w-1/2">
                <h1 className="mb-4 text-3xl font-semibold text-center text-gray-700 dark:text-gray-200">
                    상품 등록
                </h1>
                <form>
                    <div className="mb-4">
                        <label htmlFor="product-name"
                               className="block text-xl font-medium text-gray-700 dark:text-gray-400">
                            상품명
                        </label>
                        <input
                            type="text"
                            id="product-name"
                            className="w-full px-5 py-4 text-xl border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                            placeholder="상품명을 입력하세요"
                        />
                    </div>

                    <div className="mb-4">
                        <label htmlFor="price" className="block text-xl font-medium text-gray-700 dark:text-gray-400">
                            가격
                        </label>
                        <input
                            type="number"
                            id="price"
                            className="w-full px-5 py-4 text-xl border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                            placeholder="가격을 입력하세요"
                        />
                    </div>

                    <div className="mb-4">
                        <label htmlFor="category"
                               className="block text-xl font-medium text-gray-700 dark:text-gray-400">
                            카테고리
                        </label>
                        <select
                            id="category"
                            className="w-full px-5 py-4 text-xl border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                        >
                            <option>---</option>
                            <option value="간편식">간편식</option>
                            <option value="라면">라면</option>
                            <option value="아이스크림">아이스크림</option>
                            <option value="커피">커피</option>
                        </select>
                    </div>

                    <div className="mb-4">
                        <label htmlFor="description"
                               className="block text-xl font-medium text-gray-700 dark:text-gray-400">
                            상품 설명
                        </label>
                        <textarea
                            id="description"
                            className="w-full px-5 py-4 text-xl border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                            placeholder="상품 설명을 입력하세요"
                            rows={4}
                        ></textarea>
                    </div>

                    <div className="mb-6">
                        <label htmlFor="image" className="block text-xl font-medium text-gray-700 dark:text-gray-400">
                            이미지 업로드
                        </label>
                        <input
                            type="file"
                            id="image"
                            className="mt-1 block w-full text-gray-700 dark:text-gray-300"
                        />
                    </div>

                    <button
                        type="submit"
                        className="w-full px-4 py-2 text-xl font-medium text-white bg-purple-600 rounded-lg hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-opacity-50 transition-colors duration-150"
                    >
                        상품 등록
                    </button>
                </form>
            </div>
        </div>

    );
}

export default AdminProductRegisterCompnent;