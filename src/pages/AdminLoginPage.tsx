function AdminLoginPage() {
    return (
            <div className="flex items-center justify-center p-6 sm:p-12 md:w-1/2">
                <div className="w-full">
                    <h1 className="mb-4 text-xl font-semibold text-gray-700 dark:text-gray-200">
                        Login
                    </h1>
                    <form>
                        <div className="mb-4">
                            <label htmlFor="email"
                                   className="block text-sm font-medium text-gray-700 dark:text-gray-400">
                                Email
                            </label>
                            <input
                                type="email"
                                id="email"
                                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-purple-500 focus:ring focus:ring-purple-500 focus:ring-opacity-50 dark:border-gray-600 dark:bg-gray-700 dark:text-gray-300"
                                placeholder="Jane Doe"
                            />
                        </div>
                        <div className="mb-6">
                            <label htmlFor="password"
                                   className="block text-sm font-medium text-gray-700 dark:text-gray-400">
                                Password
                            </label>
                            <input
                                type="password"
                                id="password"
                                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-purple-500 focus:ring focus:ring-purple-500 focus:ring-opacity-50 dark:border-gray-600 dark:bg-gray-700 dark:text-gray-300"
                                placeholder="***************"
                            />
                        </div>
                        <button
                            type="submit"
                            className="w-full px-4 py-2 text-sm font-medium text-white bg-purple-600 rounded-lg hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-opacity-50 transition-colors duration-150"
                        >
                            Log in
                        </button>
                    </form>
                </div>
            </div>
    );
}

export default AdminLoginPage;