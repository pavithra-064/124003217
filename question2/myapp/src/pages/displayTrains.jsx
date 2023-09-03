import React, { useEffect, useState } from "react";

import config from "../config";
import { useNavigate } from "react-router-dom";
const DisplayTrains = () => {
  const [trainData, setTrainData] = useState([]);
  const navigate = useNavigate();
  useEffect(() => {
    const fetchData = async () => {
      try {
        const requestData = config.requestData;
        const responseToken = await fetch("http://20.244.56.144/train/auth", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(requestData),
        });
        if (!responseToken.ok) {
          throw new Error("Network response was not ok");
        }
        const tokenData = await responseToken.json();
        console.log(tokenData.access_token);

        if (tokenData.access_token) {
          const responseTrain = await fetch(
            "http://20.244.56.144:80/train/trains",
            {
              method: "GET",
              headers: {
                Authorization: `Bearer ${tokenData.access_token}`,
              },
            }
          );

          if (!responseTrain.ok) {
            throw new Error("Network response was not ok");
          }

          const trainData = await responseTrain.json();
          const uniqueTrainData = Array.from(
            new Set(trainData.map((train) => train.trainNumber))
          ).map((trainNumber) =>
            trainData.find((train) => train.trainNumber === trainNumber)
          );

          setTrainData(uniqueTrainData);
        } else {
          console.error("Failed to obtain Bearer Token");
        }
      } catch (error) {
        console.error("Error:", error);
      }
    };

    fetchData();
  }, []);

  const handleRowClick = (trainNumber) => {
    navigate(`/train/${trainNumber}`);
  };

  return (
    <div className="container mx-auto mt-10">
      <h1 className="text-3xl font-semibold mb-4">Train Schedule</h1>
      <table className="min-w-full divide-y divide-gray-200">
        <thead>
          <tr>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Train Number
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Train Name
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Departure Time
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Sleeper Seats
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              AC Seats
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Sleeper Price
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              AC Price
            </th>
          </tr>
        </thead>
        <tbody>
          {trainData ? (
            trainData.map((train) => (
              <tr
                key={train.trainNumber}
                onClick={() => handleRowClick(train.trainNumber)}
              >
                <td className="px-6 py-4 whitespace-nowrap">
                  {train.trainNumber}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  {train.trainName}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  {train.departureTime.Hours}:{train.departureTime.Minutes}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  {train.seatsAvailable.sleeper}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  {train.seatsAvailable.AC}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  {train.price.sleeper}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  {train.price.AC}
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td className="px-6 py-4 whitespace-nowrap" colSpan="7">
                No trains available.
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default DisplayTrains;
