import { Link } from 'react-router-dom';

function AdminLoginPage() {
    return (
        <div className="flex items-center justify-center min-h-screen bg-gray-100 p-6">
            <div className="flex w-full max-w-6xl bg-white rounded-xl shadow-2xl overflow-hidden">

                <div className="hidden lg:block lg:w-1/2 bg-purple-600 rounded-l-xl"></div>

                <div className="w-full lg:w-1/2 p-16">
                    <h1 className="text-4xl font-bold text-gray-800 mb-10">Login</h1>
                    <form>
                        <div className="mb-8">
                            <label htmlFor="email" className="block text-lg font-medium text-gray-700 mb-3">
                                Email
                            </label>
                            <input
                                type="email"
                                id="email"
                                className="w-full px-5 py-4 text-xl border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                                placeholder="이메일 입력"
                            />
                        </div>
                        <div className="mb-10">
                            <label htmlFor="password" className="block text-lg font-medium text-gray-700 mb-3">
                                Password
                            </label>
                            <input
                                type="password"
                                id="password"
                                className="w-full px-5 py-4 text-xl border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                                placeholder="비밀번호 입력"
                            />
                        </div>
                        <Link
                            to="/main"
                            className="block w-full bg-purple-600 text-white text-center py-4 px-6 text-xl font-semibold rounded-lg hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-opacity-50 transition-colors duration-300"
                        >
                            Login
                        </Link>
                    </form>
                    <p className="mt-10 text-center">
                        <Link to="#" className="text-purple-600 hover:underline text-lg">Create account</Link>
                    </p>
                </div>
            </div>
        </div>
    );
}

export default AdminLoginPage;