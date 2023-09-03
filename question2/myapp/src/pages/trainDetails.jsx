const TrainDetails = (props) => {
  const trainNumber = props.params.trainNumber;

  return (
    <div className="container mx-auto mt-10">
      <h1 className="text-3xl font-semibold mb-4">Train Details</h1>
      <h1>Train Details</h1>
      <p>Train Number: {trainNumber}</p>
    </div>
  );
};

export default TrainDetails;
