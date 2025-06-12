// components/ShippingBenefits.jsx
import { Award, Clock, CreditCard, Truck } from "lucide-react";

const ShippingBenefits = () => {
  return (
    <div className="w-full bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {/* Fast & Free Shipping */}
          <div className="flex flex-col gap-4">
            <div className="w-10 h-10 flex items-center justify-center">
              <Truck size={34} />
            </div>
            <div>
              <h3 className="text-3xl font-semibold text-gray-900">
                Fast & Free Shipping
              </h3>
              <p className="mt-1 text-sm text-gray-500">
                Every single order ships for free. No extra credit needed.
              </p>
            </div>
          </div>

          {/* 30 Days Returns */}
          <div className="flex flex-col gap-4">
            <div className="w-10 h-10 flex items-center justify-center">
              <Clock size={34} />
            </div>
            <div>
              <h3 className="text-3xl font-semibold text-gray-900">
                30 Days Returns
              </h3>
              <p className="mt-1 text-sm text-gray-500">
                Product returns are accepted within 30 days.
              </p>
            </div>
          </div>

          {/* Secure Payment */}
          <div className="flex flex-col gap-4">
            <div className="w-10 h-10 flex items-center justify-center">
              <CreditCard size={34} />
            </div>
            <div>
              <h3 className="text-3xl font-semibold text-gray-900">
                Secure Payment
              </h3>
              <p className="mt-1 text-sm text-gray-500">
                100% secure and reliable payment methods accepted.
              </p>
            </div>
          </div>

          {/* Great Quality */}
          <div className="flex flex-col gap-4">
            <div className="w-10 h-10 flex items-center justify-center">
              <Award size={34} />
            </div>
            <div>
              <h3 className="text-3xl font-semibold text-gray-900">
                Great Quality
              </h3>
              <p className="mt-1 text-sm text-gray-500">
                We always test our products for highest grade quality.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ShippingBenefits;
