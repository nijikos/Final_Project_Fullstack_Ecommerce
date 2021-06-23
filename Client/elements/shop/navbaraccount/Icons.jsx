import React from "react";
import {
  IoIosSearch,
  IoMdPerson,
  IoIosCart,
  IoIosNotifications,
} from "react-icons/io";

function Icons() {
  return (
    <div className='header-content__icons space-pl--15'>
      <ul className='d-none d-lg-block'>
        <li>
          <button>
            <IoIosNotifications />
          </button>
        </li>
        <li>
          <button>
            <IoMdPerson />
          </button>
        </li>
      </ul>
    </div>
  );
}

export default Icons;
