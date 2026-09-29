import { useState, useId } from "react"
import { z } from "zod"
import { CheckCircle } from "@phosphor-icons/react"
import { cn } from "@/lib/utils"

/* ─── Zod schema ─────────────────────────────────────────── */

const schema = z.object({
  fullName: z.string().min(2, "Please enter your full name."),
  email: z.string().email("Please enter a valid email address."),
  timeframe: z.string().min(1, "Please select a timeframe."),
  budget: z.string().min(1, "Please select a budget range."),
  projectDetails: z
    .string()
    .min(30, "Please provide at least 30 characters so I can understand your project."),
})

type FormData = z.infer<typeof schema>
type FieldErrors = Partial<Record<keyof FormData, string>>

/* ─── Static options ─────────────────────────────────────── */

const TIMEFRAMES = [
  { value: "", label: "Select a timeframe…" },
  { value: "asap", label: "ASAP — ready to start immediately" },
  { value: "1_month", label: "Within 1 month" },
  { value: "1_3_months", label: "1 – 3 months" },
  { value: "3_6_months", label: "3 – 6 months" },
  { value: "6_plus", label: "6+ months / ongoing" },
  { value: "flexible", label: "Flexible / not yet defined" },
]

const BUDGETS = [
  { value: "", label: "Select a budget range…" },
  { value: "under_2k", label: "Under $2,000" },
  { value: "2k_5k", label: "$2,000 – $5,000" },
  { value: "5k_10k", label: "$5,000 – $10,000" },
  { value: "10k_20k", label: "$10,000 – $20,000" },
  { value: "20k_50k", label: "$20,000 – $50,000" },
  { value: "50k_plus", label: "$50,000+" },
  { value: "discuss", label: "Let's discuss" },
]

/* ─── Sub-components ─────────────────────────────────────── */

const fieldBase =
  "w-full rounded-xl border border-[var(--ds-border)] bg-[var(--ds-surface)] px-4 py-3 text-body-s text-[var(--ds-text-primary)] placeholder:text-[var(--ds-text-placeholder)] transition-colors duration-150 focus:outline-none focus:border-[var(--ds-accent)] focus:ring-2 focus:ring-[var(--ds-border-accent)]"

const fieldError =
  "border-[var(--ds-error)] focus:border-[var(--ds-error)] focus:ring-[rgba(220,38,38,0.2)]"

function FieldLabel({
  htmlFor,
  children,
  required,
}: {
  htmlFor: string
  children: React.ReactNode
  required?: boolean
}) {
  return (
    <label
      htmlFor={htmlFor}
      className="block text-body-s font-semibold text-[var(--ds-text-primary)] mb-1.5"
    >
      {children}
      {required && (
        <span aria-hidden className="ml-1 text-[var(--ds-error)]">
          *
        </span>
      )}
    </label>
  )
}

function FieldMessage({ message }: { message?: string }) {
  if (!message) return null
  return (
    <p role="alert" className="mt-1.5 text-label text-[var(--ds-error)] normal-case tracking-normal">
      {message}
    </p>
  )
}

/* ─── Main form component ────────────────────────────────── */

export function ProjectInquiryForm() {
  const id = useId()
  const fId = (name: string) => `${id}-${name}`

  const [values, setValues] = useState<FormData>({
    fullName: "",
    email: "",
    timeframe: "",
    budget: "",
    projectDetails: "",
  })
  const [errors, setErrors] = useState<FieldErrors>({})
  const [touched, setTouched] = useState<Partial<Record<keyof FormData, boolean>>>({})
  const [submitting, setSubmitting] = useState(false)
  const [submitted, setSubmitted] = useState(false)

  const set = (field: keyof FormData, value: string) =>
    setValues((prev) => ({ ...prev, [field]: value }))

  const touch = (field: keyof FormData) =>
    setTouched((prev) => ({ ...prev, [field]: true }))

  /** Validate a single field on blur. */
  const validateField = (field: keyof FormData, value: string) => {
    const partial = { ...values, [field]: value }
    const result = schema.safeParse(partial)
    if (result.success) {
      setErrors((prev) => ({ ...prev, [field]: undefined }))
    } else {
      const fe = result.error.flatten().fieldErrors
      setErrors((prev) => ({ ...prev, [field]: fe[field]?.[0] }))
    }
  }

  const handleBlur = (field: keyof FormData) => {
    touch(field)
    validateField(field, values[field])
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Touch all fields so errors become visible
    const allTouched = Object.fromEntries(
      Object.keys(values).map((k) => [k, true])
    ) as Record<keyof FormData, boolean>
    setTouched(allTouched)

    const result = schema.safeParse(values)
    if (!result.success) {
      const fe = result.error.flatten().fieldErrors
      setErrors(
        Object.fromEntries(
          Object.entries(fe).map(([k, msgs]) => [k, msgs?.[0]])
        ) as FieldErrors
      )
      return
    }

    setSubmitting(true)
    // Simulate micro-delay for button feedback (no real async work)
    setTimeout(() => {
      const { fullName, email, timeframe, budget, projectDetails } = result.data
      console.log("Project inquiry submitted:", {
        fullName,
        email,
        timeframe,
        budget,
        projectDetails,
      })
      setSubmitting(false)
      setSubmitted(true)
    }, 600)
  }

  /* ── Success state ── */
  if (submitted) {
    return (
      <div className="card-surface w-full max-w-[760px] text-left px-md py-lg flex flex-col items-start gap-sm">
        <CheckCircle
          size={40}
          weight="duotone"
          className="text-[var(--ds-success)]"
          aria-hidden
        />
        <h3 className="text-h3 text-[var(--ds-text-primary)]">
          Thanks — I'll be in touch soon.
        </h3>
        <p className="text-body-s text-[var(--ds-text-secondary)] max-w-[48ch]">
          Your project inquiry has been received. I'll review the details and respond
          within 1–2 business days.
        </p>
      </div>
    )
  }

  /* ── Form ── */
  return (
    <form
      onSubmit={handleSubmit}
      noValidate
      aria-label="Project inquiry form"
      className="card-surface w-full max-w-[760px] text-left px-md py-lg flex flex-col gap-md"
    >
      {/* Heading + intro */}
      <div className="flex flex-col gap-xs">
        <h3 className="text-h3 text-[var(--ds-text-primary)]">
          Got a project in mind?
        </h3>
        <p className="text-body-s text-[var(--ds-text-secondary)] max-w-[52ch]">
          I can't wait to learn about your project. Here are a few questions to
          help me understand your specific needs and I'll be in touch very soon.
        </p>
      </div>

      {/* Two-column row on desktop for Name + Email */}
      <div className="grid gap-md sm:grid-cols-2">
        {/* Full Name */}
        <div>
          <FieldLabel htmlFor={fId("fullName")} required>
            Full Name
          </FieldLabel>
          <input
            id={fId("fullName")}
            type="text"
            name="fullName"
            autoComplete="name"
            required
            aria-required="true"
            aria-describedby={errors.fullName && touched.fullName ? fId("fullName-err") : undefined}
            aria-invalid={!!(errors.fullName && touched.fullName)}
            value={values.fullName}
            placeholder="Your full name"
            className={cn(fieldBase, errors.fullName && touched.fullName && fieldError)}
            onChange={(e) => set("fullName", e.target.value)}
            onBlur={() => handleBlur("fullName")}
          />
          {touched.fullName && (
            <FieldMessage message={errors.fullName} />
          )}
        </div>

        {/* Email */}
        <div>
          <FieldLabel htmlFor={fId("email")} required>
            Email
          </FieldLabel>
          <input
            id={fId("email")}
            type="email"
            name="email"
            autoComplete="email"
            required
            aria-required="true"
            aria-describedby={errors.email && touched.email ? fId("email-err") : undefined}
            aria-invalid={!!(errors.email && touched.email)}
            value={values.email}
            placeholder="you@example.com"
            className={cn(fieldBase, errors.email && touched.email && fieldError)}
            onChange={(e) => set("email", e.target.value)}
            onBlur={() => handleBlur("email")}
          />
          {touched.email && (
            <FieldMessage message={errors.email} />
          )}
        </div>
      </div>

      {/* Two-column row for Timeframe + Budget */}
      <div className="grid gap-md sm:grid-cols-2">
        {/* Timeframe */}
        <div>
          <FieldLabel htmlFor={fId("timeframe")} required>
            Choose a Timeframe
          </FieldLabel>
          <select
            id={fId("timeframe")}
            name="timeframe"
            required
            aria-required="true"
            aria-invalid={!!(errors.timeframe && touched.timeframe)}
            value={values.timeframe}
            className={cn(
              fieldBase,
              "appearance-none cursor-pointer",
              // show placeholder colour when nothing is selected
              !values.timeframe && "text-[var(--ds-text-placeholder)]",
              errors.timeframe && touched.timeframe && fieldError
            )}
            onChange={(e) => {
              set("timeframe", e.target.value)
              if (touched.timeframe) validateField("timeframe", e.target.value)
            }}
            onBlur={() => handleBlur("timeframe")}
          >
            {TIMEFRAMES.map((o) => (
              <option key={o.value} value={o.value} disabled={o.value === ""}>
                {o.label}
              </option>
            ))}
          </select>
          {touched.timeframe && (
            <FieldMessage message={errors.timeframe} />
          )}
        </div>

        {/* Budget */}
        <div>
          <FieldLabel htmlFor={fId("budget")} required>
            Choose a Budget
          </FieldLabel>
          <select
            id={fId("budget")}
            name="budget"
            required
            aria-required="true"
            aria-invalid={!!(errors.budget && touched.budget)}
            value={values.budget}
            className={cn(
              fieldBase,
              "appearance-none cursor-pointer",
              !values.budget && "text-[var(--ds-text-placeholder)]",
              errors.budget && touched.budget && fieldError
            )}
            onChange={(e) => {
              set("budget", e.target.value)
              if (touched.budget) validateField("budget", e.target.value)
            }}
            onBlur={() => handleBlur("budget")}
          >
            {BUDGETS.map((o) => (
              <option key={o.value} value={o.value} disabled={o.value === ""}>
                {o.label}
              </option>
            ))}
          </select>
          {touched.budget && (
            <FieldMessage message={errors.budget} />
          )}
        </div>
      </div>

      {/* Project Details */}
      <div>
        <FieldLabel htmlFor={fId("projectDetails")} required>
          Project Details
        </FieldLabel>
        <textarea
          id={fId("projectDetails")}
          name="projectDetails"
          required
          aria-required="true"
          aria-invalid={!!(errors.projectDetails && touched.projectDetails)}
          value={values.projectDetails}
          rows={5}
          placeholder="Please tell me more about your project and how I can help."
          className={cn(
            fieldBase,
            "resize-y min-h-[120px]",
            errors.projectDetails && touched.projectDetails && fieldError
          )}
          onChange={(e) => set("projectDetails", e.target.value)}
          onBlur={() => handleBlur("projectDetails")}
        />
        <div className="mt-1.5 flex items-center justify-between">
          {touched.projectDetails && errors.projectDetails ? (
            <FieldMessage message={errors.projectDetails} />
          ) : (
            <span />
          )}
          <span className="text-label text-[var(--ds-text-faint)] normal-case tracking-normal ml-auto">
            {values.projectDetails.length} chars
          </span>
        </div>
      </div>

      {/* Submit */}
      <button
        type="submit"
        disabled={submitting}
        data-cursor="link"
        className="text-btn inline-flex items-center justify-center gap-sm self-start rounded-xl px-lg py-sm font-semibold select-none transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--ds-border-accent)] bg-[var(--ds-accent)] text-[var(--ds-text-inverse)] shadow-[var(--shadow-electric)] hover:-translate-y-0.5 hover:bg-[var(--ds-accent-hover)] hover:shadow-[var(--shadow-electric-hover)] active:translate-y-0 active:bg-[var(--ds-accent-active)] disabled:opacity-60 disabled:cursor-not-allowed disabled:translate-y-0"
      >
        {submitting ? "Submitting…" : "Submit Project Details"}
      </button>
    </form>
  )
}
