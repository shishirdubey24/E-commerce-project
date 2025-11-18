const Footer = () => {
  return (
    <footer className="bg-[#FAFBFC] mt-32 pt-20 border-t border-gray-200">
      <div className="max-w-[1400px] mx-auto px-6 py-16 grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-12">

        {/* Column 1 */}
        <div>
          <h3 className="text-sm font-bold text-gray-800 mb-4">ONLINE SHOPPING</h3>
          <ul className="space-y-2 text-gray-600 text-sm">
            <li>Men</li>
            <li>Women</li>
            <li>Kids</li>
            <li>Home & Living</li>
            <li>Beauty</li>
            <li>Gift Card</li>
            <li>Myntra Insider</li>
          </ul>
        </div>

        {/* Column 2 */}
        <div>
          <h3 className="text-sm font-bold text-gray-800 mb-4">CUSTOMER POLICIES</h3>
          <ul className="space-y-2 text-gray-600 text-sm">
            <li>Contact Us</li>
            <li>FAQ</li>
            <li>T&amp;C</li>
            <li>Terms Of Use</li>
            <li>Track Orders</li>
            <li>Shipping</li>
            <li>Cancellation</li>
          </ul>
        </div>

        {/* Column 3 */}
        <div>
          <h3 className="text-sm font-bold text-gray-800 mb-4">USEFUL LINKS</h3>
          <ul className="space-y-2 text-gray-600 text-sm">
            <li>Blog</li>
            <li>Careers</li>
            <li>Site Map</li>
            <li>Corporate Info</li>
            <li>Whitehat</li>
          </ul>
        </div>

        {/* Column 4 */}
        <div>
          <h3 className="text-sm font-bold text-gray-800 mb-4">KEEP IN TOUCH</h3>
          <p className="text-gray-600 text-sm leading-relaxed">
            Stay updated with new arrivals, trending products, and exclusive offers.
          </p>

          {/* Static Icons (no links) */}
          <div className="flex items-center gap-4 mt-4">
            <div className="w-9 h-9 bg-gray-200 rounded-full flex items-center justify-center text-gray-700">F</div>
            <div className="w-9 h-9 bg-gray-200 rounded-full flex items-center justify-center text-gray-700">I</div>
            <div className="w-9 h-9 bg-gray-200 rounded-full flex items-center justify-center text-gray-700">Y</div>
          </div>
        </div>

      </div>

      {/* Bottom Bar */}
      <div className="border-t border-gray-200 py-5 text-center text-sm text-gray-500">
        © {new Date().getFullYear()} Trend-Wired. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;
