
export default function Footer() {
  return (
    <>
      <footer className="text-3xl text-white text-center
        border-t-4 
        fixed
        inset-x-0
        bottom-0
        p-4 p-1 bottom-0 bg-white mt-auto shadow md:flex md:items-center md:justify-between md:p-3 dark:bg-gray-800">
        <span className="text-sm text-gray-500 sm:text-center dark:text-gray-400">© 2023 <a href="#" className="hover:underline">Abhilash Shetty</a>. All Rights Reserved.
        </span>
        <ul className="flex flex-wrap items-center mt-3 text-sm text-gray-500 dark:text-gray-400 sm:mt-0">
          <li>
            <a href="#" className="mr-4 hover:underline md:mr-6 ">About</a>
          </li>
          <li>
            <a href="#" className="hover:underline">Contact</a>
          </li>
        </ul>
      </footer>
    </>
  )
}