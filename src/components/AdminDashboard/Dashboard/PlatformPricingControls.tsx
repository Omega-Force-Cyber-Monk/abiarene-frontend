import { useState } from "react";
import { Pencil, Check } from "lucide-react";

const PlatformPricingControls = () => {
  const [editEar, setEditEar] = useState(false);
  const [editTrusted, setEditTrusted] = useState(false);
  const [editSenior, setEditSenior] = useState(false);

  const [ear, setEar] = useState({ min15: 15, min30: 30, payout: 70 });
  const [trusted, setTrusted] = useState({ min15: 25, min30: 50, payout: 75 });
  const [senior, setSenior] = useState({ min15: 40, min30: 80, payout: 80 });

  return (
    <div className="bg-gray-100 p-6 rounded-2xl w-full h-full">
      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-lg font-semibold text-gray-700">
          Platform Pricing Controls
        </h2>
        <button className="text-sm text-purple-500 font-medium">
          Global Rates
        </button>
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 gap-5">
        {/* Ear */}
        <div className="bg-indigo-100 p-5 rounded-xl shadow-sm">
          <div className="flex justify-between items-center mb-4">
            <h3 className="font-semibold text-gray-700">Ear</h3>
            {editEar ? (
              <Check
                size={16}
                className="cursor-pointer text-green-600"
                onClick={() => setEditEar(false)}
              />
            ) : (
              <Pencil
                size={16}
                className="cursor-pointer text-gray-500"
                onClick={() => setEditEar(true)}
              />
            )}
          </div>

          <div className="flex justify-between text-sm mb-2">
            <span>15 min</span>
            {editEar ? (
              <input
                type="number"
                value={ear.min15}
                onChange={(e) =>
                  setEar({ ...ear, min15: Number(e.target.value) })
                }
                className="w-20 px-2 py-1 rounded border"
              />
            ) : (
              <span>${ear.min15}</span>
            )}
          </div>

          <div className="flex justify-between text-sm">
            <span>30 min</span>
            {editEar ? (
              <input
                type="number"
                value={ear.min30}
                onChange={(e) =>
                  setEar({ ...ear, min30: Number(e.target.value) })
                }
                className="w-20 px-2 py-1 rounded border"
              />
            ) : (
              <span>${ear.min30}</span>
            )}
          </div>

          <div className="flex justify-between mt-5 text-sm">
            <span>Payout</span>
            {editEar ? (
              <input
                type="number"
                value={ear.payout}
                onChange={(e) =>
                  setEar({ ...ear, payout: Number(e.target.value) })
                }
                className="w-20 px-2 py-1 rounded border"
              />
            ) : (
              <span className="text-green-600 font-semibold">
                {ear.payout}%
              </span>
            )}
          </div>
        </div>

        {/* Trusted Ear */}
        <div className="bg-pink-100 p-5 rounded-xl shadow-sm">
          <div className="flex justify-between items-center mb-4">
            <h3 className="font-semibold text-gray-700">Trusted Ear</h3>
            {editTrusted ? (
              <Check
                size={16}
                className="cursor-pointer text-green-600"
                onClick={() => setEditTrusted(false)}
              />
            ) : (
              <Pencil
                size={16}
                className="cursor-pointer text-gray-500"
                onClick={() => setEditTrusted(true)}
              />
            )}
          </div>

          <div className="flex justify-between text-sm mb-2">
            <span>15 min</span>
            {editTrusted ? (
              <input
                type="number"
                value={trusted.min15}
                onChange={(e) =>
                  setTrusted({ ...trusted, min15: Number(e.target.value) })
                }
                className="w-20 px-2 py-1 rounded border"
              />
            ) : (
              <span>${trusted.min15}</span>
            )}
          </div>

          <div className="flex justify-between text-sm">
            <span>30 min</span>
            {editTrusted ? (
              <input
                type="number"
                value={trusted.min30}
                onChange={(e) =>
                  setTrusted({ ...trusted, min30: Number(e.target.value) })
                }
                className="w-20 px-2 py-1 rounded border"
              />
            ) : (
              <span>${trusted.min30}</span>
            )}
          </div>

          <div className="flex justify-between mt-5 text-sm">
            <span>Payout</span>
            {editTrusted ? (
              <input
                type="number"
                value={trusted.payout}
                onChange={(e) =>
                  setTrusted({ ...trusted, payout: Number(e.target.value) })
                }
                className="w-20 px-2 py-1 rounded border"
              />
            ) : (
              <span className="text-green-600 font-semibold">
                {trusted.payout}%
              </span>
            )}
          </div>
        </div>

        {/* Senior Ear */}
        <div className="bg-purple-100 p-5 rounded-xl shadow-sm">
          <div className="flex justify-between items-center mb-4">
            <h3 className="font-semibold text-gray-700">Senior Ear</h3>
            {editSenior ? (
              <Check
                size={16}
                className="cursor-pointer text-green-600"
                onClick={() => setEditSenior(false)}
              />
            ) : (
              <Pencil
                size={16}
                className="cursor-pointer text-gray-500"
                onClick={() => setEditSenior(true)}
              />
            )}
          </div>

          <div className="flex justify-between text-sm mb-2">
            <span>15 min</span>
            {editSenior ? (
              <input
                type="number"
                value={senior.min15}
                onChange={(e) =>
                  setSenior({ ...senior, min15: Number(e.target.value) })
                }
                className="w-20 px-2 py-1 rounded border"
              />
            ) : (
              <span>${senior.min15}</span>
            )}
          </div>

          <div className="flex justify-between text-sm">
            <span>30 min</span>
            {editSenior ? (
              <input
                type="number"
                value={senior.min30}
                onChange={(e) =>
                  setSenior({ ...senior, min30: Number(e.target.value) })
                }
                className="w-20 px-2 py-1 rounded border"
              />
            ) : (
              <span>${senior.min30}</span>
            )}
          </div>

          <div className="flex justify-between mt-5 text-sm">
            <span>Payout</span>
            {editSenior ? (
              <input
                type="number"
                value={senior.payout}
                onChange={(e) =>
                  setSenior({ ...senior, payout: Number(e.target.value) })
                }
                className="w-20 px-2 py-1 rounded border"
              />
            ) : (
              <span className="text-green-600 font-semibold">
                {senior.payout}%
              </span>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default PlatformPricingControls;
