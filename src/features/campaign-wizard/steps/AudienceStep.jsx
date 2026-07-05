import { useEffect, useState } from 'react'
import { UploadCloud, CloudDownload, Trash2, Search } from 'lucide-react'
import LinkedinIcon from '../../../components/icons/LinkedinIcon'
import AccordionSection from '../../../components/ui/AccordionSection'
import Input from '../../../components/ui/Input'
import Button from '../../../components/ui/Button'
import ImportMethodCards from '../ImportMethodCards'
import LookalikeModal from '../LookalikeModal'
import { useWizard } from '../WizardContext'
import { contactFieldRows, unmappedFields } from '../../../mock/csvColumns'

export default function AudienceStep({ onValidChange }) {
  const { data, update } = useWizard()
  const [openSection, setOpenSection] = useState('method')
  const [lookalikeOpen, setLookalikeOpen] = useState(false)
  const [csvUploaded, setCsvUploaded] = useState(false)

  const method = data.importMethod

  useEffect(() => {
    const valid =
      (method === 'linkedin' && data.linkedInUrl.trim().length > 0) ||
      (method === 'csv' && csvUploaded) ||
      (method === 'lookalike' && data.selectedLookalikeIds.length > 0) ||
      method === 'webhook'
    onValidChange(valid)
  }, [method, data.linkedInUrl, csvUploaded, data.selectedLookalikeIds, onValidChange])

  const selectMethod = (id) => {
    update({ importMethod: id })
    if (id === 'lookalike') {
      setLookalikeOpen(true)
      return
    }
    setOpenSection(id === 'csv' ? 'csv' : id === 'linkedin' ? 'linkedin' : 'method')
  }

  return (
    <div>
      <AccordionSection
        title="Choose Import Method"
        badge={method === 'csv' ? 'Step 1 of 2' : undefined}
        status={method ? 'done' : 'current'}
        open={openSection === 'method'}
        onToggle={() => setOpenSection(openSection === 'method' ? null : 'method')}
      >
        <ImportMethodCards selected={method} onSelect={selectMethod} />
      </AccordionSection>

      {method === 'linkedin' && (
        <AccordionSection
          title="Paste LinkedIn Search URL"
          status={data.linkedInUrl ? 'done' : 'current'}
          open={openSection === 'linkedin'}
          onToggle={() => setOpenSection(openSection === 'linkedin' ? null : 'linkedin')}
        >
          <div className="rounded-md border border-border-input p-4">
            <p className="mb-3 flex items-center gap-2 text-sm text-body">
              <LinkedinIcon size={16} className="text-link" />
              Find your target audience with{' '}
              <a className="text-link underline">LinkedIn Search</a> or <a className="text-link underline">Sales Navigator</a> or{' '}
              <a className="text-link underline">Post URL</a> or <a className="text-link underline">Group URL</a>
            </p>
            <div className="flex flex-col gap-3 sm:flex-row">
              <Input
                containerClassName="flex-1"
                placeholder="https://www.linkedin.com/search/results/people/?keywords="
                value={data.linkedInUrl}
                onChange={(e) => update({ linkedInUrl: e.target.value })}
              />
              <Button className="sm:self-start">
                <Search size={14} /> Validate
              </Button>
            </div>
            <p className="mt-2 text-xs text-muted">Paste the search URL directly from LinkedIn</p>
          </div>
        </AccordionSection>
      )}

      {method === 'csv' && (
        <AccordionSection
          title={csvUploaded ? 'Upload CSV file Selected' : 'Upload CSV File'}
          badge="Step 1 of 2"
          status={csvUploaded ? 'done' : 'current'}
          open={openSection === 'csv'}
          onToggle={() => setOpenSection(openSection === 'csv' ? null : 'csv')}
        >
          {!csvUploaded ? (
            <label className="flex cursor-pointer flex-col items-center justify-center gap-2 rounded-md border-2 border-dashed border-link/40 bg-[#F5F8FF] py-14 text-center">
              <input
                type="file"
                accept=".csv"
                className="hidden"
                onChange={() => {
                  setCsvUploaded(true)
                  setOpenSection('mapping')
                }}
              />
              <span className="flex size-9 items-center justify-center rounded-full bg-link/10 text-link">
                <UploadCloud size={18} />
              </span>
              <span className="text-sm text-link underline">Drag a File or click a browse</span>
              <span className="text-xs text-muted">File with up to 100 rows works best</span>
            </label>
          ) : (
            <p className="flex items-center gap-2 text-sm text-link">
              <CloudDownload size={14} /> sample-leads.csv uploaded
            </p>
          )}
          <button type="button" className="mt-3 flex items-center gap-1 text-xs text-link">
            <CloudDownload size={14} /> Download a sample file
          </button>
        </AccordionSection>
      )}

      {method === 'csv' && csvUploaded && (
        <AccordionSection
          title="Map Properties"
          status="current"
          open={openSection === 'mapping'}
          onToggle={() => setOpenSection(openSection === 'mapping' ? null : 'mapping')}
        >
          <div className="rounded-md border border-[#EBE9F1]">
            <div className="flex items-center justify-between border-b border-[#EBE9F1] p-4">
              <div>
                <h4 className="text-base font-medium text-dark">Map Properties</h4>
                <p className="mt-1 text-xs text-link">✓ Make sure file includes contact name and phone number</p>
              </div>
              <button className="text-danger">
                <Trash2 size={18} />
              </button>
            </div>
            <div className="grid grid-cols-1 gap-6 p-4 md:grid-cols-[1fr_1fr_auto]">
              <div>
                <p className="mb-2 text-xs font-semibold text-muted">Contact Field</p>
                <div className="flex flex-col gap-2">
                  {contactFieldRows.map((row) => (
                    <div key={row.field} className="flex items-center gap-2 rounded-md border border-[#28C76F] bg-[#E9FBF0] px-3 py-2 text-sm text-text-secondary">
                      {row.field}
                    </div>
                  ))}
                </div>
              </div>
              <div>
                <p className="mb-2 text-xs font-semibold text-muted">CSV Column</p>
                <div className="flex flex-col gap-2">
                  {contactFieldRows.map((row) => (
                    <div
                      key={row.column}
                      className="flex items-center justify-between rounded-md border border-border-input px-3 py-2 text-sm text-text-secondary"
                    >
                      {row.column} <span className="text-xs text-muted">({row.count})</span>
                    </div>
                  ))}
                </div>
              </div>
              <div className="md:w-56">
                <p className="mb-2 text-xs font-semibold text-muted">Unmapped Works</p>
                <Input placeholder="Search" containerClassName="mb-2" />
                <div className="flex flex-col gap-2">
                  {unmappedFields.map((f) => (
                    <div
                      key={f.name}
                      className="flex items-center justify-between rounded-md border border-border-input px-3 py-2 text-sm text-text-secondary"
                    >
                      {f.name} ({f.matched}) <span className="text-xs text-muted">({f.count})</span>
                    </div>
                  ))}
                </div>
                <button className="mt-2 text-xs text-link">Clear All Matched</button>
              </div>
            </div>
          </div>
        </AccordionSection>
      )}

      {method === 'lookalike' && data.selectedLookalikeIds.length > 0 && (
        <div className="rounded-md border border-[#E7EDF6] p-4 text-sm text-text-secondary">
          Selected lookalike list(s): <strong>{data.selectedLookalikeIds.join(', ')}</strong>
        </div>
      )}

      {method === 'webhook' && (
        <div className="rounded-md border border-[#E7EDF6] p-4 text-sm text-text-secondary">
          Webhook endpoint generated — connect it from Zapier, n8n, or Make to sync leads in real time.
        </div>
      )}

      <LookalikeModal
        open={lookalikeOpen}
        hasLeads
        onClose={() => setLookalikeOpen(false)}
        onSelect={(ids) => {
          update({ selectedLookalikeIds: ids })
          setLookalikeOpen(false)
        }}
      />
    </div>
  )
}
