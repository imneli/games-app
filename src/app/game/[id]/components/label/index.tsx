interface LabelProps {
    name: string
}

export function Label({ name }: LabelProps) {
    return(
        <div className="bg-slate-200 py-1 px-3 rounded-full ">
            {name}
        </div>
    )
}