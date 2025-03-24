import { Link } from "react-router-dom";
import Logo from "../components/Logo";

const Landing = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <header className="w-full py-4 px-6 flex justify-between items-center bg-white border-b border-gray-200">
        <Logo />
        <div className="flex gap-4">
          <Link to="/signin" className="text-black hover:text-blue-600">
            Sign In
          </Link>
          <Link to="/signup" className="text-black hover:text-blue-600">
            Sign Up
          </Link>
        </div>
      </header>

      <main className="flex-1 flex flex-col md:flex-row">
        <div className="w-full md:w-1/2 flex flex-col justify-center items-center p-8 md:p-16">
          <div className="max-w-md">
            <h1 className="text-5xl font-bold mb-6">
              Send money instantly with SwiftPay
            </h1>
            <p className="text-xl mb-8">
              Fast, secure, and easy money transfers to anyone, anywhere.
            </p>

            <div className="flex flex-col sm:flex-row gap-4">
              <Link
                to="/signup"
                className="py-3 px-6 bg-black text-white rounded-md text-center hover:bg-gray-800 transition-colors"
              >
                Get Started
              </Link>
              <Link
                to="/signin"
                className="py-3 px-6 bg-white text-black border border-black rounded-md text-center hover:bg-gray-100 transition-colors"
              >
                Sign In
              </Link>
            </div>
          </div>
        </div>

        <div className="w-full md:w-1/2 bg-gray-100 flex justify-center items-center p-8 md:p-0">
          <div className="max-w-md w-full">
            <div className="bg-white p-8 rounded-lg shadow-lg border border-gray-200">
              <div className="flex justify-between items-center mb-6">
                <div>
                  <p className="text-sm text-gray-600">Sending to</p>
                  <p className="font-medium">Venkatesh Alampally</p>
                </div>
                <div className="h-12 w-12 bg-gray-200 rounded-full flex items-center justify-center">
                  <p className="text-3xl">VA</p>
                </div>
              </div>

              <div className="mb-6">
                <p className="text-sm text-gray-600 mb-1">Amount</p>
                <div className="text-4xl font-bold">₹1,000</div>
              </div>

              <button className="w-full py-3 bg-black text-white rounded-md hover:bg-gray-800 transition-colors">
                Send Money
              </button>
            </div>
          </div>
        </div>
      </main>

      <footer className="w-full py-6 px-6 bg-white border-t border-gray-200">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <div className="flex gap-4">
            <a
              href="https://github.com/Venki1402"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-600 hover:text-gray-900 transition"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                x="0px"
                y="0px"
                width="24"
                height="24"
                viewBox="0 0 30 30"
              >
                <path d="M15,3C8.373,3,3,8.373,3,15c0,5.623,3.872,10.328,9.092,11.63C12.036,26.468,12,26.28,12,26.047v-2.051 c-0.487,0-1.303,0-1.508,0c-0.821,0-1.551-0.353-1.905-1.009c-0.393-0.729-0.461-1.844-1.435-2.526 c-0.289-0.227-0.069-0.486,0.264-0.451c0.615,0.174,1.125,0.596,1.605,1.222c0.478,0.627,0.703,0.769,1.596,0.769 c0.433,0,1.081-0.025,1.691-0.121c0.328-0.833,0.895-1.6,1.588-1.962c-3.996-0.411-5.903-2.399-5.903-5.098 c0-1.162,0.495-2.286,1.336-3.233C9.053,10.647,8.706,8.73,9.435,8c1.798,0,2.885,1.166,3.146,1.481C13.477,9.174,14.461,9,15.495,9 c1.036,0,2.024,0.174,2.922,0.483C18.675,9.17,19.763,8,21.565,8c0.732,0.731,0.381,2.656,0.102,3.594 c0.836,0.945,1.328,2.066,1.328,3.226c0,2.697-1.904,4.684-5.894,5.097C18.199,20.49,19,22.1,19,23.313v2.734 c0,0.104-0.023,0.179-0.035,0.268C23.641,24.676,27,20.236,27,15C27,8.373,21.627,3,15,3z"></path>
              </svg>
            </a>
            <a
              href="https://x.com/ASaiVenkatesh1"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-600 hover:text-blue-500 transition"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                x="0px"
                y="0px"
                width="24"
                height="24"
                viewBox="0 0 30 30"
              >
                <path d="M26.37,26l-8.795-12.822l0.015,0.012L25.52,4h-2.65l-6.46,7.48L11.28,4H4.33l8.211,11.971L12.54,15.97L3.88,26h2.65 l7.182-8.322L19.42,26H26.37z M10.23,6l12.34,18h-2.1L8.12,6H10.23z"></path>
              </svg>
            </a>
          </div>
          <p className="text-sm text-gray-600">
            © 2025 SwiftPay. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  );
};

export default Landing;
