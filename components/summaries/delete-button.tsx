"use client";
import { Button } from "@/components/ui/button";
import { Ghost, Trash2Icon } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { toast } from "sonner";
import { useState, useTransition } from "react";
import { deleteSummary } from "@/actions/summary-action";

export default function DeleteButton({ summaryId }: { summaryId: string }) {
  const [open, setOpen] = useState(false);
  const [isPending, startTransition] = useTransition();
  const handledelete = async () => {
    startTransition(async () => {
      const result = await deleteSummary({ summaryId });
      if (!result.success) {
        toast(
          <div>
            <strong>❌ Error</strong>
            <div>Failed to delete summary</div>
          </div>,
        );
      }
      setOpen(false);
    });
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button
          variant={"ghost"}
          size={"icon"}
          className="text-gray-400 bg-gray-50 border border-gray-200 hover:text-rose-600 hover:bg-rose-50"
        >
          <Trash2Icon className="h-4 w-4" />
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Delete Summary</DialogTitle>
          <DialogDescription>
            Are you sure you want to delte the summary?
          </DialogDescription>
        </DialogHeader>
        <DialogFooter>
          <Button
            variant={"ghost"}
            className="px-2 bg-gray-50  border-gray-200 hover:text-gray-600  hover:bg-gray-100  "
            onClick={() => setOpen(false)}
          >
            Cancel
          </Button>
          <Button
            variant={"destructive"}
            onClick={handledelete}
            //     size={"icon"}
            className=" bg-gray-900  hover:bg-gray-600  "
          >
            {isPending ? "Deleting..." : <Trash2Icon className="h-4 w-4" />}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
