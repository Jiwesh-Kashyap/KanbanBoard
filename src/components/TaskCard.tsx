interface MyProps {
    subject: string,
    index: number
}

export default function TaskCard({ subject, index }: MyProps) {
    return (
        <div className="card ml-4 mt-3">
            <h4 className="text-2xl">{index}{". "}{subject}</h4>
        </div>
    )
}