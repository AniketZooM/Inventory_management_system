import Link from 'next/link';
import { Button } from '@/components/ui/button';

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center bg-gradient-to-b from-blue-50 to-blue-100 p-4">
      <div className="flex flex-col items-center justify-center max-w-4xl mx-auto text-center">
        <h1 className="text-4xl font-bold tracking-tight text-blue-900 sm:text-6xl">
          LSTM-Based Inventory Optimization System
        </h1>
        <p className="mt-6 text-lg leading-8 text-gray-700">
          A modern inventory management solution with intelligent forecasting capabilities.
          Optimize your stock levels, reduce costs, and prevent shortages with machine learning predictions.
        </p>
        <div className="mt-10 flex items-center justify-center gap-x-6">
          <Link href="/login">
            <Button variant="default" size="lg">
              Login
            </Button>
          </Link>
          <Link href="/register">
            <Button variant="outline" size="lg">
              Register
            </Button>
          </Link>
        </div>

        <div className="mt-20 grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
          <div className="bg-white p-6 rounded-xl shadow-sm">
            <h2 className="text-xl font-semibold text-blue-900">Smart Forecasting</h2>
            <p className="mt-2 text-gray-600">
              Advanced LSTM neural networks predict your future inventory needs with high accuracy.
            </p>
          </div>

          <div className="bg-white p-6 rounded-xl shadow-sm">
            <h2 className="text-xl font-semibold text-blue-900">Interactive Dashboard</h2>
            <p className="mt-2 text-gray-600">
              Visualize your inventory data and forecasts with intuitive and interactive charts.
            </p>
          </div>

          <div className="bg-white p-6 rounded-xl shadow-sm">
            <h2 className="text-xl font-semibold text-blue-900">Detailed Reports</h2>
            <p className="mt-2 text-gray-600">
              Generate comprehensive PDF reports with recommendations for optimal stock management.
            </p>
          </div>
        </div>
      </div>
    </main>
  );
}
