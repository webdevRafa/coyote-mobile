import { useState } from "react";

interface AppointmentListProps {
  appointments: {
    id: string;
    appointmentDate: string;
    createdAt: string;
    serviceId: string;
    status: string;
  }[];
}

interface Appointment {
  id: string;
  serviceId?: string;
  appointmentDate: string | Date;
  status: string;
}

export const AppointmentList: React.FC<AppointmentListProps> = ({
  appointments,
}) => {
  const [managing, setManaging] = useState(false);
  const [selectedAppointment, setSelectedAppointment] =
    useState<Appointment | null>(null);

  const handleManage = (appointment: Appointment) => {
    setManaging(true);
    setSelectedAppointment(appointment);
  };

  const handleInputChange = (field: keyof Appointment, value: string) => {
    if (selectedAppointment) {
      setSelectedAppointment({
        ...selectedAppointment,
        [field]: value,
      });
    }
  };

  const handleSave = () => {
    // Save to backend logic (e.g., update Firestore)
    console.log("Saving updated appointment:", selectedAppointment);

    // Close the popup after saving
    setManaging(false);
  };

  if (appointments.length === 0) {
    return (
      <div className="bg-white rounded shadow-md p-5 mt-10 h-full">
        <h2 className="text-2xl font-bold mb-4 text-gray">
          No Appointments Found
        </h2>
        <button className="bg-blue text-white p-2 rounded shadow-md font-mono hover:md:scale-105 transition ease-in-out duration-75">
          Schedule an appointment
        </button>
      </div>
    );
  }

  return (
    <>
      <div className="relative">
        <div className="p-4 bg-off-white rounded">
          <h2 className="text-2xl font-bold mb-4 text-gray">
            Your Appointments
          </h2>
          <ul>
            {appointments.map((appointment) => (
              <li
                key={appointment.id}
                className="p-2 mb-5 bg-white shadow-sm hover:shadow-md animation transition ease-in-out duration-75"
              >
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
                <button
                  onClick={() => handleManage(appointment)}
                  className="bg-blue p-1 rounded-sm text-white transition ease-in-out hover:scale-105 duration-75"
                >
                  Manage
                </button>
              </li>
            ))}
          </ul>
        </div>
        {managing && selectedAppointment && (
          <div className="absolute w-full h-full bg-white top-0 left-0 shadow-md flex justify-center items-center">
            <div>
              <h1 className="mb-5 text-xl font-bold text-gray border-b-2 border-off-white pb-2">
                Manage Appointment
              </h1>
              <label>
                <strong>Service:</strong>
                <input
                  type="text"
                  value={selectedAppointment.serviceId || ""}
                  onChange={(e) =>
                    handleInputChange("serviceId", e.target.value)
                  }
                  className="block w-full p-1 border rounded mb-3"
                />
              </label>
              <label>
                <strong>Date:</strong>
                <input
                  type="datetime-local"
                  value={
                    new Date(selectedAppointment.appointmentDate)
                      .toISOString()
                      .slice(0, 16) // For datetime-local input
                  }
                  onChange={(e) =>
                    handleInputChange("appointmentDate", e.target.value)
                  }
                  className="block w-full p-1 border rounded mb-3"
                />
              </label>
              <label>
                <strong>Status:</strong>
                <select
                  value={selectedAppointment.status}
                  onChange={(e) => handleInputChange("status", e.target.value)}
                  className="block w-full p-1 border rounded mb-3"
                >
                  <option value="confirmed">Confirmed</option>
                  <option value="pending">Pending</option>
                  <option value="cancelled">Cancelled</option>
                </select>
              </label>
              <button
                onClick={handleSave}
                className="bg-blue p-1 rounded-sm text-white mr-2"
              >
                Save
              </button>
              <button
                onClick={() => setManaging(false)}
                className="bg-red p-1 rounded-sm text-white"
              >
                Close
              </button>
            </div>
          </div>
        )}
      </div>
    </>
  );
};
