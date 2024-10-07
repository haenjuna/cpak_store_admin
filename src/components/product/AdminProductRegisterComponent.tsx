import {initProductState, IProduct} from "../../types/product.ts";
import {useRef, useState} from "react";
import {postAdd} from "../../apis/productAPI.ts";
import {useNavigate} from "react-router-dom";



function AdminProductRegisterComponent() {

    // 객체 상태변경 및 사용을 위한 State 처리
    const [product, setProduct] = useState<IProduct>({...initProductState});

    // 파일등록처리 반응형 객체
    const filesRef = useRef<HTMLInputElement>(null);
    const navigate = useNavigate()

    // 인풋값 변경시 State 객체 value 변경 처리 함수
    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {

        const {name, value} = e.target;

        setProduct((prevProduct: IProduct) => ({
            ...prevProduct,
            [name]: value,
        }));
    };

    // 등록버튼 클릭 함수
    const handleSubmit = () => {
        const files = filesRef?.current?.files;
        const formData:FormData = new FormData();

        if (files && files.length > 0) {
            for (let i = 0; i < files.length; i++) {
                formData.append('files', files[i]);
            }//end for
        }// end if

        formData.append('pname',product.pname)
        formData.append('pdesc',product.pdesc)
        formData.append('price',product.price)

        postAdd(formData).then(() => {
            if (filesRef?.current?.files){
                filesRef.current.value = ''
            }
            setProduct({...initProductState})
            navigate('/product/list',)
        })
    }

    return (
        <div className="flex items-center justify-center h-screen p-6 sm:p-12">
            <div className="w-full md:w-1/2">
                <h1 className="mb-4 text-3xl font-semibold text-center text-gray-700 dark:text-gray-200">
                    상품 등록
                </h1>
                <div>
                    <div className="mb-4">
                        <label htmlFor="product-name"
                               className="block text-xl font-medium text-gray-700 dark:text-gray-400">
                            상품명
                        </label>
                        <input
                            type="text"
                            id="product-name"
                            name="pname"
                            value={product.pname}
                            className="w-full px-5 py-4 text-xl border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                            placeholder="상품명을 입력하세요"
                            onChange={handleInputChange}
                        />
                    </div>

                    <div className="mb-4">
                        <label htmlFor="price" className="block text-xl font-medium text-gray-700 dark:text-gray-400">
                            가격
                        </label>
                        <input
                            type="number"
                            id="price"
                            name="price"
                            value={product.price}
                            className="w-full px-5 py-4 text-xl border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                            placeholder="가격을 입력하세요"
                            onChange={handleInputChange}
                        />
                    </div>

                    <div className="mb-4">
                        <label htmlFor="description"
                               className="block text-xl font-medium text-gray-700 dark:text-gray-400">
                            상품 설명
                        </label>
                        <textarea
                            id="description"
                            name="pdesc"
                            value={product.pdesc}
                            className="w-full px-5 py-4 text-xl border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                            placeholder="상품 설명을 입력하세요"
                            onChange={handleInputChange}
                            rows={4}
                        />
                    </div>

                    <div className="mb-6">
                        <label htmlFor="image" className="block text-xl font-medium text-gray-700 dark:text-gray-400">
                            이미지 업로드
                        </label>
                        <input
                            type="file"
                            id="image"
                            ref={filesRef}
                            name='files'
                            multiple={true}
                            className="mt-1 block w-full text-gray-700 dark:text-gray-300"
                        />
                    </div>

                    <button
                        type="submit"
                        className="w-full px-4 py-2 text-xl font-medium text-white bg-purple-600 rounded-lg hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-opacity-50 transition-colors duration-150"
                        onClick={handleSubmit}
                    >
                        상품 등록
                    </button>
                </div>
            </div>
        </div>
    );
}

export default AdminProductRegisterComponent