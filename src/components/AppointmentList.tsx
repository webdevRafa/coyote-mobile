interface AppointmentListProps {
  appointments: {
    id: string;
    appointmentDate: string;
    createdAt: string;
    serviceId: string;
    status: string;
  }[];
}

export const AppointmentList: React.FC<AppointmentListProps> = ({
  appointments,
}) => {
  if (appointments.length === 0) {
    return (
      <div className="bg-white rounded shadow-md p-5 mt-10 h-full">
        <h2 className="text-2xl font-bold mb-4 text-gray">
          No Appointments Found
        </h2>
        <button className="bg-blue p-2 rounded shadow-md font-mono hover:md:scale-105 transition ease-in-out duration-75">
          GET STARTED
        </button>
      </div>
    );
  }

  return (
    <div className="p-4 bg-white rounded shadow-md">
      <h2 className="text-3xl font-bold mb-4">Your Appointments</h2>
      <ul className="bg-white shadow-md">
        {appointments.map((appointment) => (
          <li key={appointment.id} className="p-2 border-b-2 last:border-0">
            <p>
              <strong>Service: </strong>
              {appointment.serviceId || "N/A"}
            </p>
            <p>
              <strong>Date:</strong>{" "}
              {new Date(appointment.appointmentDate).toLocaleString()}
            </p>
            <p>
              <strong>Status: </strong>
              {appointment.status}
            </p>
            <button className="bg-blue px-2 rounded-sm">modify</button>
          </li>
        ))}
      </ul>
    </div>
  );
};
