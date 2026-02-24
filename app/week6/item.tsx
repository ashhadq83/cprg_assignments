interface ItemProps {
  name: string;
  quantity: number;
  category: string;
}

export default function Item({ name, quantity, category }: ItemProps) {
  return (
    <li className="group relative p-4 bg-white rounded-xl hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
      <div className="absolute inset-0 bg-linear-to-r from-blue-50 to-purple-50 rounded-xl -z-10 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
      <div className="flex justify-between items-center">
        <div className="flex-1">
          <span className="font-semibold text-gray-800 group-hover:text-blue-700  px-2 py-1 rounded-lg hover:shadow-md transition-shadow duration-300">
            {name}
          </span>
        </div>
        <div className="flex items-center gap-3">
          <span className="px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-sm font-semibold hover:shadow-md transition-shadow duration-300">
            Qty: {quantity}
          </span>
          <span className="px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-sm capitalize hover:shadow-md transition-shadow duration-300">
            {category}
          </span>
        </div>
      </div>
    </li>
  );
}
