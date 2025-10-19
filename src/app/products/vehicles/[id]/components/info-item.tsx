function InfoItem({ label, value }: { label: string; value: React.ReactNode }) {
  return (
    <div className="flex flex-col justify-start">
      <span className="text-gray-500 text-xs uppercase">{label}</span>
      <span className="text-white text-sm mt-1 capitalize">{value}</span>
    </div>
  )
}

export default InfoItem;