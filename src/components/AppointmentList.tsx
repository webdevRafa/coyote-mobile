import { useState } from "react";
import { ScheduleAppointment } from "./ScheduleAppointment";
import { Appointment, formatDateTime } from "../utilities/types";
import { cancelAppointment } from "../services/cancelAppointment";

interface AppointmentListProps {
  appointments: Appointment[];
  onRemoveAppointment: (appointmentId: string) => void;
}

export const AppointmentList: React.FC<AppointmentListProps> = ({
  appointments,
  onRemoveAppointment,
}) => {
  const [managing, setManaging] = useState(false);
  const [selectedAppointment, setSelectedAppointment] =
    useState<Appointment | null>(null);
  const [loading, setLoading] = useState(false);

  const handleManage = (appointment: Appointment) => {
    setManaging(true);
    setSelectedAppointment(appointment);
  };

  const handleCancelAppointment = async () => {
    if (!selectedAppointment) return;

    const documentDate = selectedAppointment.date;
    const timeSlot = selectedAppointment.slot;

    if (!documentDate || !timeSlot) {
      console.error("Invalid appointment data:", selectedAppointment);
      alert("Cannot cancel this appointment due to invalid data.");
      return;
    }

    try {
      setLoading(true);
      await cancelAppointment(documentDate, timeSlot);
      onRemoveAppointment(selectedAppointment.id);
      alert("Appointment successfully canceled!");
      setManaging(false);
    } catch (error) {
      console.error("Failed to cancel appointment:", error);
      alert("An error occurred while canceling the appointment.");
    } finally {
      setLoading(false);
    }
  };

  if (appointments.length === 0) {
    return (
      <div className="bg-white rounded shadow-md p-5 mt-10 h-full">
        <h2 className="text-2xl font-bold mb-4 text-gray">
          No Appointments Found
        </h2>
        <ScheduleAppointment />
      </div>
    );
  }

  return (
    <>
      <div className="relative">
        <div className="p-4 rounded">
          <h2 className="text-2xl my-4 text-white">Your Appointments</h2>
          <ul>
            {appointments.map((appointment) => (
              <li
                key={appointment.id}
                className="p-4 mb-5 bg-off-white hover:bg-white shadow-sm hover:shadow-md animation transition ease-in-out duration-75 group"
              >
                <p className="mb-2">
                  <strong>Reason for Visit: </strong>
                  <span className=" px-2 py-1 shadow-md">
                    {appointment.reasonForVisit}
                  </span>
                </p>

                <p className="mb-2">
                  <strong>Status: </strong>
                  {appointment.status}
                </p>
                <p className="mb-2">
                  <strong>Date: </strong>
                  {formatDateTime(appointment.date)}
                </p>
                <p className="mb-2">
                  <strong>Time: </strong>
                  {appointment.slot}
                </p>
                <button
                  onClick={() => handleManage(appointment)}
                  className="font-mono bg-dark-gray p-1 rounded-sm text-white transition ease-in-out duration-300 group-hover:bg-blue"
                >
                  Manage
                </button>
              </li>
            ))}
          </ul>
        </div>
        {managing && selectedAppointment && (
          <div className="w-full h-full absolute top-0 left-0 bg-off-white flex items-center justify-center">
            <div>
              <h1 className=" text-gray mb-2">
                <strong>Reason for Visit: </strong>{" "}
                {selectedAppointment.reasonForVisit}
              </h1>
              <h2 className="mb-2">
                <strong>Date: </strong>{" "}
                {formatDateTime(selectedAppointment.date)}
              </h2>
              <div className="flex gap-3 justify-between">
                <button
                  onClick={handleCancelAppointment}
                  disabled={loading}
                  className={`bg-red rounded-sm shadow-md text-white py-1 px-2 mt-5 mx-auto block font-mono ${
                    loading ? "opacity-50 cursor-not-allowed" : ""
                  }`}
                >
                  {loading ? "Cancelling..." : "Cancel Appointment"}
                </button>
                <button
                  onClick={() => setManaging(false)}
                  className="bg-green rounded-sm shadow-md text-white py-1 px-2 mt-5 mx-auto block font-mono"
                >
                  Reschedule
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
      <div className="mt-10 px-4">
        <h2 className="text-2xl font-bold mb-4 text-gray">
          Schedule an Appointment
        </h2>
        <ScheduleAppointment />
      </div>
    </>
  );
};
