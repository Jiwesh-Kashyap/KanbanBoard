interface TaskCardProps {
  subject: string;
  id: string;
}

export default function TaskCard({ subject, id }: TaskCardProps) {
    const handleDragStart = (e: React.DragEvent<HTMLDivElement>) => {
        e.dataTransfer.setData('text/plain', id);
    }
  return (
    <div
      draggable = {true}
      onDragStart={handleDragStart}
      className="card ml-4 mt-3 flex flex-row"
      
    >
      <h4 className="text-2xl transition-transform hover:translate-x-2">
        {subject}
      </h4>
    </div>
  );
}
