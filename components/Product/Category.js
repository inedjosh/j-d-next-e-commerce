import React, { useContext } from "react";
import { DataContext } from "../../store/GlobalState";

function Category(props) {
  const { state } = useContext(DataContext);
  const { categories } = state;
  console.log(categories);
  return (
    <div className="mt-10">
      <h3 className="text-l hidden md:block text-center">Shop by category</h3>
      <div className="flex justify-center mt-10">
        {categories.map((category) => (
          <div
            key={category._id}
            className="flex flex-col justify-center items-center"
          >
            <img
              className=" object-cover mx-5 rounded w-full"
              style={{ width: 130 }}
              src="https://imgaz1.chiccdn.com/thumb/wap/oaupload/newchic/images/B6/1C/9a0e5b4f-bbc9-4cca-9492-bf963a892854.jpg.webp?s=240x320"
              alt="category.name"
            />
            <p className="uppercase font-semibold text-sm">{category.name}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Category;
