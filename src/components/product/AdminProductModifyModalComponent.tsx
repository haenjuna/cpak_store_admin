import {IProduct} from "../../types/product.ts";

interface ModalPorps {
    product: IProduct;
    onClose: () => void;
    // changeType: (choice:string) => void;
}

function AdminProductModifyModalComponent({onClose, product}: ModalPorps) {

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4">
            <div className="bg-white rounded-lg shadow-xl w-full max-w-lg p-2.5">
                <div className="flex justify-between items-center px-6 py-2 border-b">
                    <h2 className="text-xl font-semibold text-gray-900">제품 상세 정보</h2>
                    <button
                        onClick={onClose}
                        className="text-gray-400 hover:text-gray-500 text-2xl font-bold"
                        aria-label="닫기"
                    >
                        X
                    </button>
                </div>
                <div className="px-6 py-2.5">
                    <div className="flex mb-4">
                        <img
                            src=""
                            className="w-full h-48 object-cover rounded"
                        />
                    </div>
                    <div className="space-y-4">
                        <div className="flex justify-between items-center gap-2">
                            <div className="w-full">
                                <label className="block text-sm font-medium text-gray-700">상품명</label>
                                <input
                                    type="text"
                                    readOnly
                                    className="mt-1 block w-full px-3 py-2 bg-gray-100 border border-gray-300 rounded-md shadow-sm focus:outline-none sm:text-sm"
                                />
                            </div>
                            <div className="w-full">
                                <label className="block text-sm font-medium text-gray-700">상품 가격</label>
                                <input
                                    type="text"
                                    readOnly
                                    className="mt-1 block w-full px-3 py-2 bg-gray-100 border border-gray-300 rounded-md shadow-sm focus:outline-none sm:text-sm"
                                />
                            </div>
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700">상품 설명</label>
                            <textarea
                                readOnly
                                rows={3}
                                className="mt-1 block w-full px-3 py-2 bg-gray-100 border border-gray-300 rounded-md shadow-sm focus:outline-none sm:text-sm"
                            />
                        </div>

                    </div>
                </div>
                <div className="flex justify-end space-x-3 px-6 py-3 bg-gray-50">
                    <button
                        onClick={onClose}
                        className="px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                    >
                        닫기
                    </button>
                    <button
                        className="px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                    >
                        수정
                    </button>
                </div>
            </div>
        </div>

    );
}

export default AdminProductModifyModalComponent;