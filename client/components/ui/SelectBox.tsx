import {
    Command,
    CommandEmpty,
    CommandGroup,
    CommandInput,
    CommandItem,
    CommandList,
} from "@/components/ui/command";
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover";
import { Button } from "./button";


export default function SelectBox({ btnText, currSelect, data, onSelect }: { currSelect: string, onSelect: Function, btnText: string, data: { name: string, desc?: string }[] }) {
  
    return (
        <Popover>
            <PopoverTrigger asChild>
                <Button variant="outline" className="ml-auto">
                    {btnText}{" "}
                    {/* <ChevronDownIcon className="ml-2 h-4 w-4 text-muted-foreground" /> */}
                </Button>
            </PopoverTrigger>
            <PopoverContent className="p-0" align="end">
                <Command>
                    <CommandInput placeholder="Select new role..." />
                    <CommandList>
                        <CommandEmpty>No roles found.</CommandEmpty>
                        <CommandGroup>
                            {
                                data && data?.map((item, index) => (
                                    <CommandItem key={index}
                                        onSelect={(val) => onSelect(val)}
                                        className={`"cursor-pointer teamaspace-y-1 flex flex-col items-start px-4 py-2 ${currSelect === item.name ? "bg-slate-200" : ""}`}>
                                        <p>{item.name}</p>
                                    </CommandItem>
                                ))
                            }
                        </CommandGroup>
                    </CommandList>
                </Command>
            </PopoverContent>
        </Popover>
    )
}
