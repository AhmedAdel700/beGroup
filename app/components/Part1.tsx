"use client";

import { useTranslations } from "next-intl";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchUserInfo, createNewUser } from "../store/userSlice";
import { AppDispatch, RootState } from "../store/store";

interface FormData {
  FirstName: string;
  LastName: string;
  Email: string;
  Phone: string;
}

export default function Part1() {
  const t = useTranslations("Part1");

  const { info, loading, error } = useSelector(
    (state: RootState) => state.user
  );

  const dispatch: AppDispatch = useDispatch();

  const [data, setData] = useState<FormData>({
    FirstName: "",
    LastName: "",
    Email: "",
    Phone: "",
  });

  useEffect(() => {
    dispatch(fetchUserInfo());
  }, [dispatch]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    dispatch(createNewUser(data));

    // Reset form fields after submission
    setData({
      FirstName: "",
      LastName: "",
      Email: "",
      Phone: "",
    });

    dispatch(fetchUserInfo());
  };

  return (
    <>
      <div className="flex items-center bg-background px-6 lg:px-12 md:px-12 pt-4">
        <span className="w-[64px] h-[4px] bg-customPurple rounded-sm"></span>
        <h2 className="text-xl mx-4">{t("Part 1")}</h2>
      </div>

      <section className="flex flex-col lg:flex-row gap-10 p-4 bg-background pt-10 pb-10 lg:px-12 md:px-12">
        {/* Left Hand Side */}
        <div className="left-handside flex flex-col lg:w-1/2 space-y-4">
          <form onSubmit={handleSubmit}>
            {/* First and Last Name */}
            <div className="names flex flex-col lg:flex-row gap-8">
              <div className="flex-1">
                <label htmlFor="firstName" className="font-semibold">
                  {t("First Name")}
                </label>
                <input
                  type="text"
                  id="firstName"
                  name="FirstName"
                  placeholder={t("First Name")}
                  value={data.FirstName}
                  onChange={handleChange}
                  required
                  className="w-full mt-2 p-3 border rounded"
                />
              </div>

              <div className="flex-1">
                <label htmlFor="lastName" className="font-semibold">
                  {t("Last Name")}
                </label>
                <input
                  type="text"
                  id="lastName"
                  name="LastName"
                  placeholder={t("Last Name")}
                  value={data.LastName}
                  onChange={handleChange}
                  required
                  className="w-full mt-2 p-3 border rounded"
                />
              </div>
            </div>

            {/* Mobile Number */}
            <div className="mt-8">
              <label htmlFor="mobile" className="font-semibold">
                {t("Mobile Number")}
              </label>
              <input
                type="number"
                id="mobile"
                name="Phone"
                placeholder={t("Mobile Number")}
                value={data.Phone}
                onChange={handleChange}
                required
                className="w-full mt-2 p-3 border rounded"
              />
            </div>

            {/* Email */}
            <div className="mt-8">
              <label htmlFor="email" className="font-semibold">
                {t("Email")}
              </label>
              <input
                type="email"
                id="email"
                name="Email"
                placeholder={t("Email")}
                value={data.Email}
                onChange={handleChange}
                required
                className="w-full mt-2 p-3 border rounded"
              />
            </div>

            <button
              type="submit"
              className="mt-10 px-6 py-3 bg-customGreen text-white rounded w-full"
            >
              {t("Send")}
            </button>
          </form>
        </div>

        {/* Right Hand Side */}
        <div className="right-handside lg:w-1/2">
          <h2 className="text-customPurple font-bold mb-2">{t("Results")} :</h2>

          {/* Handle loading and error states */}
          {loading && <div>Loading...</div>}
          {error && <div className="text-red-500">Error: {error}</div>}

          {/* Table to display results */}
          <div className="overflow-x-auto border shadow-lg">
            <table className="min-w-full border-collapse lg:mt-0 bg-white">
              <thead>
                <tr className="border-b">
                  <th className="px-4 py-2 text-left text-gray-400 font-normal">
                    {t("First Name")}
                  </th>
                  <th className="px-4 py-2 text-left text-gray-400 font-normal">
                    {t("Last Name")}
                  </th>
                  <th className="px-4 py-2 text-left text-gray-400 font-normal">
                    {t("Mobile Number")}
                  </th>
                  <th className="px-4 py-2 text-left text-gray-400 font-normal">
                    {t("Email")}
                  </th>
                </tr>
              </thead>
              <tbody>
                {/* Render fetched data dynamically */}
                {info?.map((item) => (
                  <tr key={item.id} className="border-b">
                    <td className="px-4 py-2">{item.FirstName || "null"}</td>
                    <td className="px-4 py-2">{item.LastName || "null"}</td>
                    <td className="px-4 py-2">{item.Phone || "null"}</td>
                    <td className="px-4 py-2">{item.Email || "null"}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>
    </>
  );
}
