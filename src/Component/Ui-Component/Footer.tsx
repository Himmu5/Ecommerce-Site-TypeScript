import React, { useEffect } from "react";
import { memo } from "react";
import {
  FaFacebookSquare,
  FaLinkedin,
  FaTwitter,
  FaInstagram,
} from "react-icons/fa";

function Footer() {
  return (
    <div className="bg-[#415161] text-white pt-5  ">
      <div className="my-10 flex flex-col lg:flex-row justify-around gap-5 lg:gap-0 pt-5 pb-5 p-10">
        <div className="sm:flex justify-between gap-7">
          <div className="sm:w-56">
            <img
              src="https://trycasuals.com/wp-content/uploads/2019/06/print-favicon-free-img-1.png"
              alt=""
            />
            <div className="flex flex-col gap-7  mt-5">
              <h1 className="text-2xl ">Custom Print Store</h1>
              <div className="flex gap-7">
                <FaFacebookSquare />
                <FaLinkedin />
                <FaTwitter />
                <FaInstagram />
              </div>
            </div>
          </div>

          <div className="flex flex-col gap-5 sm:w-64 mt-5 lg:mt-0">
            <h1 className="text-2xl">
              Get in Touch with Us for the Best Quality Custom Prints &
              Supplies.
            </h1>
            <p>
              Qui dolore ipsum quia dolor sit amet, consec tetur adipisci velit,
              sed quia non numquam eius modi tempora incidunt lores ta porro
              ame.
            </p>
          </div>
        </div>

        <div className="sm:flex justify-between">
          <div className=" sm:w-64">
            <h1 className="text-2xl mb-5">Quick Links</h1>
            <p>Know More About Us</p>
            <p>Visit Store</p>
            <p>Let’s Connect</p>
          </div>

          <div className="mt-5 lg:mt-0 sm:w-64">
            <h1 className="text-2xl mb-5">Important Links</h1>
            <p>Privacy Policy</p>
            <p>Shipping Details</p>
            <p>Terms & Conditions</p>
          </div>
        </div>
      </div>

      <div className="border border-black py-10">
        <div className="sm:flex justify-between  max-w-6xl mx-auto">
          <p>Copyright © 2022 | Himanshu</p>
          <p>Powered By Himanshu </p>
        </div>
      </div>
    </div>
  );
}

export default memo(Footer);
