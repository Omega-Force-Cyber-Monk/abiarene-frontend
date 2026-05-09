import phone from "@/assets/primepos/logo/phone.png";

const DeviceActivation = () => {
  return (
    <div className=" space-y-4 p-6 bg-gray-300 rounded-2xl">
      <div className=" flex justify-between items-center ">
        <div className=" flex justify-between items-center space-x-3">
          <div>
            <img src={phone} alt="" />
          </div>
          <div className="">
            <h2 className="mb-2 font-semibold">Device Activation</h2>
            <p>Turn this into a POS terminal.</p>
          </div>
        </div>
        <div>
          <span className="inline-flex items-center px-3 py-1 text-sm font-medium text-green-700 bg-green-50 border border-green-200 rounded-full">
            Active
          </span>
        </div>
      </div>
      <div>
        <p>
          Your device is currently registered as 
          <span className=" font-semibold ml-1">RENE-POS-8821</span>. You can
          accept orders and process payments directly on this screen. No extra
          card reader required.
        </p>
      </div>
      <div>
        <h3 className=" font-semibold">Deactivate This Device</h3>
      </div>
    </div>
  );
};

export default DeviceActivation;
