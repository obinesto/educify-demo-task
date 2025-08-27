"use client";
import { FaFacebook, FaWhatsapp } from "react-icons/fa";
import { BsTwitterX } from "react-icons/bs";
import { MdEmail } from "react-icons/md";
import { BsFillSendFill } from "react-icons/bs";
import { useState } from "react";
import { useUser } from "./UserContext";
import { toast } from "sonner";

interface EmailData {
  recipientEmail: string;
  message: string;
}
export default function Recommendations() {
  const { user } = useUser()
  const [showEmailForm, setShowEmailForm] = useState(false);
  const [emailData, setEmailData] = useState<EmailData>({
    recipientEmail: "",
    message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);

  const handleEmailClick = () => {
    setShowEmailForm(true);
  };

  const handleWhatsAppClick = () => {
    const message = encodeURIComponent(
      "I'd like to request a professional recommendation from you."
    );
    window.open(`https://wa.me/?text=${message}`, "_blank");
  };

  const handleFacebookClick = () => {
    window.open("https://www.facebook.com/sharer/sharer.php", "_blank");
  };

  const handleTwitterClick = () => {
    const message = encodeURIComponent(
      "I'd like to request a professional recommendation."
    );
    window.open(`https://x.com/intent/tweet?text=${message}`, "_blank");
  };

  const handleEmailSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!emailData.recipientEmail || !emailData.message) {
      return;
    }

    setIsSubmitting(true);
    setSubmitError(null);

    try {
      if (!user) {
        toast.error("Please select a user first to send a recommendation request.", {
          position: "bottom-right",
        });
        setIsSubmitting(false);
        return;
      }
      const requestBody = { ...emailData, requestingUser: user };
      // console.log("requestBody:", requestBody);
      
      const response = await fetch("/api/recommendation-request", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(requestBody),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || "Something went wrong");
      }

      //   console.log("Email sent successfully!");
      toast.success("Email sent successfully", {
        position: "bottom-right",
      });
      handleEmailClose();
    } catch (error) {
      const errorMessage =
        error instanceof Error ? error.message : "An unknown error occurred.";
      setSubmitError(errorMessage);
      //   console.error("Failed to send email:", error);
      toast.error("Failed to send email", {
        position: "bottom-right",
        action: {
          label: "close",
          onClick: () => setSubmitError(null),
        },
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleEmailClose = () => {
    setShowEmailForm(false);
    setEmailData({ recipientEmail: "", message: "" });
    setSubmitError(null);
  };

  return (
    <div
      className={`w-[95%] h-[85%] mx-auto rounded-md mt-4 flex flex-col items-center justify-center relative ${
        showEmailForm ? "bg-gray-100" : "bg-white"
      }`}
    >
      <div className="mb-4">
        <p className="text-center font-bold">
          Hey Champ!
          <br /> It looks like you don&apos;t have any recommendations yet
        </p>
      </div>
      <div className="mb-6">
        <p className="text-center">
          But don&apos;t worry, you can always request for recommendations{" "}
          <br /> from your colleagues, friends and family
        </p>
      </div>

      <div className="w-[60%] h-40 border-dashed border-2 border-gray-200 rounded-md">
        <p className="text-center mb-8 font-bold">
          Ask for recommendations via:
        </p>
        <div className="flex gap-4 w-full items-center justify-center">
          <button
            type="button"
            title="Email button"
            onClick={handleEmailClick}
            className="bg-amber-400 text-white p-4 rounded-full flex gap-2 items-center cursor-pointer w-40 justify-center"
          >
            <MdEmail />
            <span>Email</span>
          </button>
          <button
            type="button"
            title="WhatsApp button"
            onClick={handleWhatsAppClick}
            className="bg-green-400 text-white p-4 rounded-full flex gap-2 items-center cursor-pointer w-40 justify-center"
          >
            <FaWhatsapp />
            <span>WhatsApp</span>
          </button>
          <button
            type="button"
            title="Facebook button"
            onClick={handleFacebookClick}
            className="bg-blue-600 text-white p-4 rounded-full flex gap-2 items-center cursor-pointer w-40 justify-center"
          >
            <FaFacebook />
            <span>Facebook</span>
          </button>
          <button
            type="button"
            title="Twitter button"
            onClick={handleTwitterClick}
            className="bg-black text-white p-4 rounded-full flex gap-2 items-center cursor-pointer w-40 justify-center"
          >
            <BsTwitterX />
            <span>x(Twitter)</span>
          </button>
        </div>
      </div>

      {showEmailForm && (
        <div className="fixed flex items-center justify-center">
          <div className="bg-white p-6 rounded-lg w-[500px] max-w-[90%]">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-xl font-bold">
                Get Recommendation via email
              </h3>
              <button
                type="button"
                onClick={handleEmailClose}
                className="text-gray-500 hover:text-gray-700 cursor-pointer"
              >
                ✕
              </button>
            </div>
            <form onSubmit={handleEmailSubmit}>
              <div className="mb-4">
                <label htmlFor="recipientEmail" className="block mb-2">
                  Recipient Email:
                </label>
                <input
                  type="email"
                  id="recipientEmail"
                  value={emailData.recipientEmail}
                  onChange={(e) =>
                    setEmailData({
                      ...emailData,
                      recipientEmail: e.target.value,
                    })
                  }
                  className="w-full p-2 border rounded"
                  required
                />
              </div>
              <div className="mb-4">
                <label htmlFor="message" className="block mb-2">
                  Message:
                </label>
                <textarea
                  id="message"
                  value={emailData.message}
                  onChange={(e) =>
                    setEmailData({ ...emailData, message: e.target.value })
                  }
                  className="w-full p-2 border rounded h-32"
                  placeholder="Enter your message"
                  required
                />
              </div>
              {submitError && (
                <div className="mb-4 text-red-500 text-sm text-center">
                  {submitError}
                </div>
              )}
              <button
                type="submit"
                disabled={
                  !emailData.recipientEmail ||
                  !emailData.message ||
                  isSubmitting
                }
                className={`w-full p-3 rounded text-white flex gap-4 justify-center items-center cursor-pointer ${
                  !emailData.recipientEmail ||
                  !emailData.message ||
                  isSubmitting
                    ? "bg-blue-300 cursor-not-allowed"
                    : "bg-blue-500 hover:bg-blue-600"
                }`}
              >
                {isSubmitting ? "Sending..." : "Send Email"}
                {!isSubmitting && <BsFillSendFill />}
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
