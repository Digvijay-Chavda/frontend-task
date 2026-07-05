import { useState } from 'react'
import { ListChecks } from 'lucide-react'
import Modal from '../../components/ui/Modal'
import Button from '../../components/ui/Button'
import { lookalikeLists } from '../../mock/campaigns'

export default function LookalikeModal({ open, onClose, onSelect, hasLeads = true }) {
  const [checked, setChecked] = useState(new Set())

  const toggle = (id) => {
    setChecked((prev) => {
      const next = new Set(prev)
      if (next.has(id)) {
        next.delete(id)
      } else {
        next.add(id)
      }
      return next
    })
  }

  return (
    <Modal
      open={open}
      onClose={onClose}
      title="Lookalikes"
      subtitle="Select a lookalike list for this campaign"
      footer={
        hasLeads ? (
          <>
            <Button variant="outline" onClick={onClose}>
              Cancel
            </Button>
            <Button disabled={checked.size === 0} onClick={() => onSelect([...checked])}>
              Select List
            </Button>
          </>
        ) : null
      }
    >
      {hasLeads ? (
        <div className="flex flex-col gap-3">
          {lookalikeLists.map((list) => (
            <label
              key={list.id}
              className={`flex cursor-pointer items-center justify-between rounded-md border p-4 ${
                checked.has(list.id) ? 'border-link' : 'border-border-input'
              }`}
            >
              <span className="flex items-center gap-2 text-sm font-medium text-dark">
                <ListChecks size={16} className="text-link" />
                {list.name} <span className="font-normal text-muted">({list.count} Users in the List)</span>
              </span>
              <input
                type="checkbox"
                checked={checked.has(list.id)}
                onChange={() => toggle(list.id)}
                className="size-4 accent-link"
              />
            </label>
          ))}
          <button type="button" className="self-end text-sm text-link hover:underline">
            + Add New
          </button>
        </div>
      ) : (
        <div className="flex flex-col items-center gap-3 py-10 text-center">
          <h3 className="text-lg font-medium text-dark">You don't have any leads</h3>
          <p className="text-sm text-body">Create a lead list to start running campaigns</p>
          <Button className="mt-2" onClick={onClose}>
            Create a List
          </Button>
        </div>
      )}
    </Modal>
  )
}
