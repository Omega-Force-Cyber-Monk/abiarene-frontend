const SystemHealth = () => {
  return (
    <div className="p-6 rounded-2xl shadow-sm border border-gray-200 bg-white w-full">
      {/* Header */}
      <h2 className="text-lg font-semibold text-gray-700 mb-5">
        System Health
      </h2>

      {/* Status List */}
      <div className="space-y-4">
        {/* API Server */}
        <div className="flex justify-between items-center">
          <p className="text-gray-600 font-medium">API Server</p>
          <span className="flex items-center gap-2 text-sm font-medium text-green-600">
            <span className="w-2.5 h-2.5 bg-green-500 rounded-full"></span>
            Operational
          </span>
        </div>

        {/* Database */}
        <div className="flex justify-between items-center">
          <p className="text-gray-600 font-medium">Database</p>
          <span className="flex items-center gap-2 text-sm font-medium text-green-600">
            <span className="w-2.5 h-2.5 bg-green-500 rounded-full"></span>
            Operational
          </span>
        </div>

        {/* Real-time Chat */}
        <div className="flex justify-between items-center">
          <p className="text-gray-600 font-medium">Real-time Chat</p>
          <span className="flex items-center gap-2 text-sm font-medium text-green-600">
            <span className="w-2.5 h-2.5 bg-green-500 rounded-full"></span>
            Operational
          </span>
        </div>

        {/* Payments */}
        <div className="flex justify-between items-center">
          <p className="text-gray-600 font-medium">Payments</p>
          <span className="flex items-center gap-2 text-sm font-medium text-green-600">
            <span className="w-2.5 h-2.5 bg-green-500 rounded-full"></span>
            Operational
          </span>
        </div>
      </div>
    </div>
  );
};

export default SystemHealth;
