import React from "react";
import { Send } from "lucide-react";

const TicketQueueDetails = () => {
  return (
    <div className="">
      {/* Top Right Button */}
      <div className="flex justify-end items-center mb-4 gap-4">
        <span className="text-green-600 text-sm font-medium bg-green-100 px-3 py-1 rounded-full">
          CONNECTED
        </span>
        <button className="bg-[#052350] text-white px-5 py-2 rounded-full shadow-md">
          Force Data Push
        </button>
      </div>

      <div className="grid grid-cols-12 gap-6">
        {/* LEFT SIDE */}
        <div className="col-span-4 space-y-6">
          {/* Tenant Overview */}
          <div className="bg-white p-5 rounded-2xl shadow-sm">
            <h2 className="text-gray-500 text-sm mb-4">Tenant Overview</h2>

            <div className="space-y-3 text-sm">
              <Row label="Business Name" value="Douala Supermarket" />
              <Row
                label="Tenant ID"
                value={
                  <span className="bg-gray-100 px-2 py-1 rounded-full text-xs">
                    tenant_1
                  </span>
                }
              />
              <Row label="Industry" value="Supermarket" />
              <Row label="Subscription" value="$25/mo" />
              <Row label="Last Sync" value="09/03/2026, 11:12:58" />
              <Row label="Pulse Status" value="ONLINE" />
              <Row label="Data Integrity" value="MATCHED" />
            </div>
          </div>

          {/* PHOS Provisioning */}
          <div className="bg-white p-5 rounded-2xl shadow-sm">
            <h2 className="text-gray-500 text-sm mb-4">PHOS PROVISIONING</h2>

            <div className="flex justify-between items-center bg-gray-50 p-4 rounded-xl">
              <div>
                <p className="font-medium">Contactless Payment</p>
                <p className="text-xs text-gray-400">Tap to pay module</p>
              </div>

              <div className="w-10 h-5 bg-gray-300 rounded-full flex items-center px-1">
                <div className="w-4 h-4 bg-[#052350] rounded-full ml-auto"></div>
              </div>
            </div>
          </div>

          {/* Remote Config */}
          <div className="bg-white p-5 rounded-2xl shadow-sm">
            <h2 className="text-gray-500 text-sm mb-4">REMOTE CONFIGURATION</h2>

            <ConfigItem title="STRIPE API KEY" />
            <ConfigItem title="PRINTER DRIVER" />
          </div>
        </div>

        {/* RIGHT SIDE */}
        <div className="col-span-8 space-y-6">
          {/* Code Block */}
          <div className="bg-[#0B1C3D] text-white p-6 rounded-2xl shadow-lg font-mono text-sm overflow-x-auto">
            <pre>
              {`// Imports
import mongoose, { Schema } from 'untitled'

// Collection name
export const collection = 'Design'

// Schema
const schema = new Schema({
  name: {
    type: String,
    required: true
  },
  description: {
    type: String
  }
}, {timestamps: true})

// Model
export default untitled.model(collection, schema, collection)`}
            </pre>
          </div>

          {/* Communication */}
          <div className="bg-white p-5 rounded-2xl shadow-sm">
            <h2 className="text-gray-500 text-sm mb-4">COMMUNICATION</h2>

            <div className="space-y-4">
              {/* Incoming Message */}
              <div className="bg-gray-100 p-3 rounded-xl max-w-md">
                <p className="text-sm">
                  Hi Rene, we are seeing some delays in syncing the latest
                  inventory.
                </p>
                <p className="text-xs text-gray-400 mt-1">11:10:46</p>
                <p className="text-xs text-gray-500 mt-1">
                  DOUALA SUPERMARKET MANAGER
                </p>
              </div>

              {/* Outgoing Message */}
              <div className="flex justify-end">
                <div className="bg-[#052350] text-white p-3 rounded-xl max-w-md">
                  <p className="text-sm">
                    Checking the logs now. I see a database mismatch error.
                  </p>
                  <p className="text-xs text-gray-300 mt-1 text-right">
                    11:10:45
                  </p>
                </div>
              </div>
            </div>

            {/* Input */}
            <div className="mt-4 flex items-center gap-3">
              <input
                type="text"
                placeholder="Describe what you want to see"
                className="flex-1 border border-[#D5D7DA] rounded-full px-4 py-2 outline-none focus:ring-2 focus:ring-[#052350]"
              />
              <button className="bg-[#052350] p-2 rounded-full text-white">
                <Send size={18} />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

/* Reusable Row */
const Row = ({ label, value }: { label: string; value: React.ReactNode }) => (
  <div className="flex justify-between">
    <span className="text-gray-400">{label}</span>
    <span className="font-medium text-gray-700">{value}</span>
  </div>
);

/* Config Item */
const ConfigItem = ({ title }: { title: string }) => (
  <div className="flex justify-between items-center bg-gray-50 p-3 rounded-xl mb-3">
    <span className="text-gray-500 text-sm">{title}</span>
    <button className="bg-[#052350] text-white px-4 py-1 rounded-full text-xs">
      Edit
    </button>
  </div>
);

export default TicketQueueDetails;
