// export default function Index() {
//   return (
//     <div className="min-h-screen bg-black flex items-center justify-center px-6">
//       <div className="text-center text-white">
//         <h1 className="text-2xl md:text-3xl font-light tracking-[0.4em] mb-4 uppercase">
//           KIRTIS CLARKE
//         </h1>
//         <Link
//           to="/projects"
//           className="text-sm tracking-widest uppercase opacity-70 hover:opacity-100 transition"
//         >
//           Enter
//         </Link>
//       </div>
//     </div>
//   );
// }

import { Link } from "react-router-dom";

export default function Index() {
  return (
    <div className="min-h-screen bg-black flex items-center justify-center px-6 w-[100vw]">
      <div className="text-center text-white">
        <h1 className="text-2xl md:text-3xl font-light tracking-[0.4em] mb-6 uppercase">
          KIRTIS CLARKE
        </h1>

        <Link
          to="/works"
          className="inline-block mt-8 text-xs tracking-wide uppercase border border-white px-6 py-2
                     hover:bg-white hover:text-black transition-all duration-200"
        >
          Enter
        </Link>
      </div>
    </div>
    // <div className="bg-red-500 p-10 hover:bg-green-500">TEST</div>
  );
}
