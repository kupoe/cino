
import { useState } from "react";

const transactions = [
  {
    id: 1,
    merchant: "Shell Gas Station",
    date: "2025-03-30",
    amount: "€100.00",
    status: "pending",
    type: "preauth",
    stage: 1,
  },
  {
    id: 2,
    merchant: "Shell Gas Station",
    date: "2025-03-30",
    amount: "€38.60",
    status: "settled",
    type: "final",
    stage: 2,
  },
  {
    id: 3,
    merchant: "NS (Dutch Railways)",
    date: "2025-03-29",
    amount: "€6.50",
    status: "settled",
    type: "transit_final",
    stage: 3,
  },
];

export default function TransactionHistory() {
  const [stage, setStage] = useState(1);

  return (
    <div className="space-y-4">
      <div className="flex gap-2 mb-2">
        {[1, 2, 3].map((s) => (
          <button
            key={s}
            onClick={() => setStage(s)}
            className={`px-3 py-1 rounded-full text-sm ${
              stage === s ? "bg-black text-white" : "bg-gray-200"
            }`}
          >
            ステージ{s}
          </button>
        ))}
      </div>
      {transactions
        .filter((tx) => tx.stage <= stage)
        .map((tx) => (
          <div
            key={tx.id + "-" + stage}
            className="flex justify-between items-start border p-3 rounded-lg"
          >
            <div>
              <div className="font-medium">{tx.merchant}</div>
              <div className="text-xs text-gray-500">{tx.date}</div>
              {tx.type === "preauth" && (
                <div className="text-xs text-yellow-600 mt-1">
                  一時的な仮押さえ（後で調整されます）
                </div>
              )}
            </div>
            <div className="text-right">
              <div className="font-semibold">{tx.amount}</div>
              <div
                className={`text-xs mt-1 ${
                  tx.status === "pending"
                    ? "text-yellow-600"
                    : "text-green-600"
                }`}
              >
                {tx.status === "pending" ? "保留中" : "確定済み"}
              </div>
            </div>
          </div>
        ))}
    </div>
  );
}
