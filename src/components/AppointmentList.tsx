import { useState } from "react";
import { ScheduleAppointment } from "./ScheduleAppointment";
import { Appointment, formatDateTime } from "../utilities/types";
import { cancelAppointment } from "../services/cancelAppointment";
import { MdClose } from "react-icons/md";
import { useNavigate } from "react-router-dom";

interface AppointmentListProps {
  appointments: Appointment[];
  onRemoveAppointment: (appointmentId: string) => void;
}

export const AppointmentList: React.FC<AppointmentListProps> = ({
  appointments,
  onRemoveAppointment,
}) => {
  const [managing, setManaging] = useState<boolean>(false);
  const [selectedAppointment, setSelectedAppointment] =
    useState<Appointment | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
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

      // trigger a re-fetch of appointments
      setTimeout(() => {
        window.location.reload(); // quick fix to force re-fetch
      }, 500);
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
      <div className="bg-dark-gray border-8 border-y-gray border-x-shade-gray rounded shadow-md p-10 mt-10 h-full max-w-[1200px] mx-auto mb-20">
        <ScheduleAppointment />
      </div>
    );
  }

  return (
    <>
      <div className="relative flex flex-col max-w-[1200px]  mx-auto my-20">
        <div className="py-4 px-6  bg-gradient-to-b from-gray shadow-md to-dark-gray relative">
          <h2 className="text-2xl my-4 text-white font-poppins">
            Your Appointments
          </h2>
          <ul className="text-dark-gray font-poppins">
            {appointments.map((appointment) => (
              <li
                key={appointment.id}
                className="py-8 px-4 mb-5 max-w-[600px]  rounded-lg bg-soft-blue hover:bg-white shadow-md hover:shadow-md animation transition ease-in-out duration-300 group"
              >
                <p className="mb-2">
                  <strong>Reason for Visit: </strong>
                  <span className=" px-2 py-1">
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
                  className="font-poppins bg-dark-gray rounded-md p-1 px-4 text-white "
                >
                  Manage
                </button>
              </li>
            ))}
          </ul>
          {managing && selectedAppointment && (
            <div className="z-40 w-full h-full absolute top-0 left-0 bg-dark-gray flex items-center justify-center slideRight font-poppins">
              <div className="absolute top-1 right-1">
                <MdClose
                  onClick={() => setManaging(false)}
                  className="size-8 text-soft-blue hover:text-white cursor-pointer"
                />
              </div>
              <div>
                <h1 className=" text-white mb-2">
                  <strong>Reason for Visit: </strong>{" "}
                  {selectedAppointment.reasonForVisit}
                </h1>
                <h2 className="mb-2 text-soft-blue">
                  <strong>Date: </strong>{" "}
                  {formatDateTime(selectedAppointment.date)}
                </h2>
                <div className="flex gap-3 justify-between">
                  <button
                    onClick={handleCancelAppointment}
                    disabled={loading}
                    className={`bg-red rounded-sm shadow-md text-white py-1 px-2 mt-5 mx-auto block font-poppins ${
                      loading ? "opacity-50 cursor-not-allowed" : ""
                    }`}
                  >
                    {loading ? "Cancelling..." : "Cancel Appointment"}
                  </button>
                  <button
                    onClick={() => setManaging(false)}
                    className="bg-green rounded-sm shadow-md text-white py-1 px-2 mt-5 mx-auto block font-poppins"
                  >
                    Reschedule
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>

        <div className="px-4 my-5  w-full">
          <ScheduleAppointment />
        </div>
      </div>
    </>
  );
};
