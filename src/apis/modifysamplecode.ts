function AdminProductEditComponent() {
    const [product, setProduct] = useState<IProduct>({...initProductState});
    const [newFiles, setNewFiles] = useState<File[]>([]);
    const filesRef = useRef<HTMLInputElement>(null);

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setProduct((prevProduct: IProduct) => ({
            ...prevProduct,
            [name]: value,
        }));
    };

    const handleImageDelete = (index: number) => {
        setProduct((prevProduct) => ({
            ...prevProduct,
            files: prevProduct.files.map((file, idx) =>
                idx === index ? { ...file, delFlag: true } : file
            ),
        }));
    };

    const handleNewFiles = (e: React.ChangeEvent<HTMLInputElement>) => {
        const files = e.target.files;
        if (files) {
            setNewFiles([...newFiles, ...Array.from(files)]);
        }
    };

    const handleSubmit = () => {
        const formData: FormData = new FormData();

        // 삭제되지 않은 기존 파일 처리
        product.files.forEach((file) => {
            if (!file.delFlag) {
                formData.append('files', file);
            }
        });

        // 새로 추가된 파일 처리
        newFiles.forEach((file) => {
            formData.append('newFiles', file);
        });

        formData.append('pname', product.pname);
        formData.append('pdesc', product.pdesc);
        formData.append('price', product.price);

        // 서버에 업데이트 요청
        putOne(formData, product.pno).then(() => {
            setProduct({ ...initProductState });
            setNewFiles([]);
        });
    };

    return (
        <div className="flex items-center justify-center h-screen p-6 sm:p-12">
        <div className="w-full md:w-1/2">
        <h1 className="mb-4 text-3xl font-semibold text-center text-gray-700 dark:text-gray-200">
            상품 수정
    </h1>

    {/* 상품명, 설명, 가격 입력 폼 */}
    {/* 기존 이미지 목록 */}
    {product.files.map((file, index) => (
        !file.delFlag && (
            <div key={index} className="mb-4">
    <img src={file.url} alt="product" className="w-20 h-20" />
    <button onClick={() => handleImageDelete(index)}>삭제</button>
    </div>
    )
    ))}

    {/* 새 이미지 업로드 */}
    <input type="file" multiple={true} onChange={handleNewFiles} />

    <button onClick={handleSubmit}>수정 완료</button>
    </div>
    </div>
);
}
