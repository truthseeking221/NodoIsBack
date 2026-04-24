import { useState } from "react";
import {
  Plus,
  Download,
  Search,
  ArrowRight,
  Bell,
  Settings,
  Trash2,
  ChevronRight,
  Home,
  BarChart3,
  Sparkles,
  Inbox,
} from "lucide-react";
import {
  Button,
  IconButton,
  TextField,
  Textarea,
  SearchBar,
  Select,
  SelectItem,
  SelectSeparator,
  Checkbox,
  RadioGroup,
  RadioItem,
  Switch,
  Badge,
  Tag,
  Chip,
  Avatar,
  Divider,
  Alert,
  Progress,
  Tooltip,
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
  ModalRoot,
  ModalTrigger,
  ModalContent,
  ModalHeader,
  ModalTitle,
  ModalDescription,
  ModalBody,
  ModalFooter,
  Tabs,
  TabsList,
  TabsTrigger,
  TabsContent,
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuLabel,
  Breadcrumb,
  Pagination,
  Stepper,
  Table,
  TableHeader,
  TableBody,
  TableRow,
  TableHead,
  TableCell,
  EmptyState,
  Skeleton,
  Spinner,
  NavItem,
  TopBar,
  Toast,
} from "../components";

const SIDEBAR = [
  { id: "foundations", label: "Foundations" },
  { id: "colors", label: "Colors" },
  { id: "typography", label: "Typography" },
  { id: "spacing", label: "Spacing · Radius" },
  { id: "shadow", label: "Shadow" },
  { id: "buttons", label: "Buttons" },
  { id: "inputs", label: "Inputs" },
  { id: "selection", label: "Selection" },
  { id: "feedback", label: "Feedback" },
  { id: "overlays", label: "Overlays" },
  { id: "data", label: "Data" },
  { id: "navigation", label: "Navigation" },
  { id: "states", label: "States" },
];

export function Showcase() {
  const [active, setActive] = useState("foundations");
  const [checked, setChecked] = useState<boolean | "indeterminate">(false);
  const [switched, setSwitched] = useState(true);
  const [page, setPage] = useState(4);
  const [chip, setChip] = useState("all");
  const [search, setSearch] = useState("");
  const [toastOpen, setToastOpen] = useState(false);

  return (
    <div className="min-h-screen bg-bg">
      <TopBar
        sticky
        glass
        logo={
          <div className="flex items-center gap-2">
            <div className="size-8 rounded-lg bg-action-primary text-text-on-primary inline-flex items-center justify-center">
              <Sparkles size={18} strokeWidth={2.5} />
            </div>
            <span className="font-bold text-h5 tracking-tight">NODO DS</span>
          </div>
        }
        nav={
          <>
            <NavItem icon={<Home size={18} />} active>
              Foundations
            </NavItem>
            <NavItem icon={<BarChart3 size={18} />}>Components</NavItem>
            <NavItem icon={<Inbox size={18} />}>Patterns</NavItem>
            <NavItem icon={<Settings size={18} />}>Tokens</NavItem>
          </>
        }
        actions={
          <>
            <div className="hidden md:block w-64">
              <SearchBar
                size="sm"
                placeholder="Search components…"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                onClear={() => setSearch("")}
              />
            </div>
            <Tooltip content="Notifications">
              <IconButton
                icon={<Bell size={18} />}
                aria-label="Notifications"
                variant="ghost"
                size="md"
              />
            </Tooltip>
            <Avatar initials="NV" size="md" status="online" />
          </>
        }
      />

      <div className="mx-auto flex w-full max-w-screen-2xl gap-8 px-4 md:px-6 py-8">
        {/* Sidebar */}
        <aside className="hidden lg:block sticky top-24 self-start w-56 shrink-0 h-[calc(100vh-120px)] overflow-y-auto scrollbar-thin">
          <nav className="flex flex-col gap-0.5">
            {SIDEBAR.map((s) => (
              <button
                key={s.id}
                onClick={() => {
                  setActive(s.id);
                  document.getElementById(s.id)?.scrollIntoView({ behavior: "smooth", block: "start" });
                }}
                className={`text-left px-3 h-9 rounded-md text-label-lg transition-colors ${
                  active === s.id
                    ? "bg-white/[0.08] text-text-primary font-semibold"
                    : "text-text-tertiary hover:text-text-primary hover:bg-white/[0.03]"
                }`}
              >
                {s.label}
              </button>
            ))}
          </nav>
        </aside>

        <main className="flex-1 min-w-0 space-y-16 pb-32">
          {/* Hero */}
          <section className="space-y-4 text-center pt-8 pb-12">
            <Badge appearance="soft" tone="brand" size="lg">
              <Sparkles size={12} className="mr-1" /> Design System v1.0
            </Badge>
            <h1 className="text-display-lg md:text-[64px] md:leading-[68px] font-bold tracking-tight max-w-4xl mx-auto">
              The design system that makes NODO feel inevitable.
            </h1>
            <p className="text-body-lg text-text-secondary max-w-2xl mx-auto">
              Semantic tokens, pixel-perfect components, fully responsive. Built once in Figma — shipped as React + Tailwind.
            </p>
            <div className="flex items-center justify-center gap-3 pt-2">
              <Button size="lg" trailingIcon={<ArrowRight size={16} />}>
                Get started
              </Button>
              <Button size="lg" variant="tertiary">
                View on Figma
              </Button>
            </div>
          </section>

          {/* Foundations */}
          <Section id="foundations" title="Foundations">
            <p className="text-body-md text-text-secondary max-w-2xl">
              Two-tier token system: primitive scales (Neutral / Brand / Green / Red) feed semantic tokens (Action / Surface /
              Text / Border). Components only reference semantics — never raw colors.
            </p>
          </Section>

          <Section id="colors" title="Colors">
            <Label>Primitive · Brand (cream scale)</Label>
            <Swatches
              colors={["brand-50","brand-100","brand-200","brand-300","brand-400","brand-500","brand-600","brand-700","brand-800","brand-900"]}
            />
            <Label className="mt-6">Primitive · Neutral (dark-first)</Label>
            <Swatches
              colors={["neutral-0","neutral-100","neutral-200","neutral-300","neutral-400","neutral-500","neutral-700","neutral-850","neutral-950","neutral-1000"]}
            />
            <Label className="mt-6">Semantic · Feedback</Label>
            <Swatches colors={["feedback-success","feedback-warning","feedback-error","feedback-info"]} />
          </Section>

          <Section id="typography" title="Typography">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-3">
                <p className="text-overline text-text-tertiary">Display</p>
                <p className="text-display-lg">Display Large</p>
                <p className="text-display-md">Display Medium</p>
                <p className="text-display-sm">Display Small</p>
              </div>
              <div className="space-y-3">
                <p className="text-overline text-text-tertiary">Heading</p>
                <p className="text-h1">Heading 1</p>
                <p className="text-h2">Heading 2</p>
                <p className="text-h3">Heading 3</p>
                <p className="text-h4">Heading 4</p>
                <p className="text-h5">Heading 5</p>
                <p className="text-h6">Heading 6</p>
              </div>
              <div className="space-y-3">
                <p className="text-overline text-text-tertiary">Body · Label</p>
                <p className="text-body-lg">Body Large — The quick brown fox.</p>
                <p className="text-body-md">Body Medium — The quick brown fox.</p>
                <p className="text-body-sm">Body Small — The quick brown fox.</p>
                <p className="text-label-lg">Label Large</p>
                <p className="text-label-md">Label Medium</p>
              </div>
              <div className="space-y-3">
                <p className="text-overline text-text-tertiary">Utility</p>
                <p className="text-caption text-text-secondary">Caption — metadata · helper</p>
                <p className="text-overline text-brand-300">OVERLINE · CATEGORY</p>
                <p className="text-helper text-text-tertiary">Helper text guides the user</p>
                <p className="text-error text-feedback-error">Error text explains what went wrong</p>
              </div>
            </div>
          </Section>

          <Section id="spacing" title="Spacing & Radius">
            <Label>Spacing scale (4-base)</Label>
            <div className="flex flex-wrap items-end gap-4">
              {[1,2,3,4,5,6,8,10,12,16,20,24].map((s) => (
                <div key={s} className="flex flex-col items-center gap-2">
                  <div className="bg-brand-500" style={{ width: s * 4, height: s * 4 }} />
                  <span className="text-caption text-text-tertiary">{s * 4}</span>
                </div>
              ))}
            </div>
            <Label className="mt-8">Radius scale</Label>
            <div className="flex flex-wrap gap-4">
              {(["none","xs","sm","md","lg","xl","2xl","full"] as const).map((r) => (
                <div key={r} className="flex flex-col items-center gap-2">
                  <div className={`size-20 bg-surface-elevated border border-border rounded-${r}`} />
                  <span className="text-caption text-text-tertiary">{r}</span>
                </div>
              ))}
            </div>
          </Section>

          <Section id="shadow" title="Elevation">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {(["xs","sm","md","lg","xl","card","dropdown","modal"] as const).map((s) => (
                <div key={s} className="rounded-xl bg-surface-elevated border border-border-subtle p-6 text-center space-y-2" style={{ boxShadow: `var(--tw-shadow-${s})` }}>
                  <div className={`h-16 rounded-lg bg-brand-500/20 border border-brand-500/40 shadow-${s}`} />
                  <p className="text-caption text-text-tertiary">shadow-{s}</p>
                </div>
              ))}
            </div>
          </Section>

          {/* Buttons */}
          <Section id="buttons" title="Buttons">
            <Label>Primary (white CTA)</Label>
            <Row>
              <Button size="sm">Small</Button>
              <Button size="md">Medium</Button>
              <Button size="lg">Large</Button>
              <Button leadingIcon={<Plus size={14} />}>New vault</Button>
              <Button trailingIcon={<ArrowRight size={14} />}>Continue</Button>
              <Button loading>Loading</Button>
              <Button disabled>Disabled</Button>
            </Row>
            <Divider className="my-6" />
            <Label>Variants</Label>
            <Row>
              <Button>Primary</Button>
              <Button variant="secondary">Secondary</Button>
              <Button variant="tertiary">Tertiary</Button>
              <Button variant="ghost">Ghost</Button>
              <Button variant="danger" leadingIcon={<Trash2 size={14} />}>
                Delete
              </Button>
              <Button variant="link">Learn more</Button>
            </Row>
            <Divider className="my-6" />
            <Label>Icon Button</Label>
            <Row>
              <IconButton icon={<Search size={16} />} aria-label="Search" size="sm" />
              <IconButton icon={<Search size={18} />} aria-label="Search" size="md" />
              <IconButton icon={<Search size={20} />} aria-label="Search" size="lg" />
              <IconButton icon={<Settings size={18} />} aria-label="Settings" variant="secondary" />
              <IconButton icon={<Bell size={18} />} aria-label="Notifications" variant="ghost" />
              <IconButton icon={<Trash2 size={18} />} aria-label="Delete" variant="danger" />
            </Row>
          </Section>

          {/* Inputs */}
          <Section id="inputs" title="Inputs">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-3xl">
              <TextField label="Email" placeholder="you@nodo.xyz" hint="We will never share your email." />
              <TextField label="Error state" placeholder="Name" error="This field is required" />
              <TextField
                label="With icon"
                placeholder="Search vaults"
                leadingIcon={<Search size={16} />}
                trailingIcon={<kbd className="text-caption text-text-tertiary bg-white/[0.06] px-1.5 rounded">⌘K</kbd>}
              />
              <TextField label="Disabled" placeholder="Locked" disabled value="read-only" />
              <Textarea label="Description" placeholder="Tell us about your vault…" hint="Max 200 characters." />
              <Select label="Vault strategy" placeholder="Pick one">
                <SelectItem value="low">Low risk · Stablecoin</SelectItem>
                <SelectItem value="med">Medium · Balanced</SelectItem>
                <SelectItem value="high">High risk · Alpha</SelectItem>
                <SelectSeparator />
                <SelectItem value="custom">Custom strategy…</SelectItem>
              </Select>
              <SearchBar
                label="Search bar"
                placeholder="Search vaults…"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                onClear={() => setSearch("")}
              />
              <TextField label="Large" size="lg" placeholder="0.00 USDC" trailingIcon={<span className="text-label-md text-text-tertiary">USDC</span>} />
            </div>
          </Section>

          {/* Selection */}
          <Section id="selection" title="Selection controls">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div>
                <Label>Checkbox</Label>
                <div className="space-y-3">
                  <Checkbox
                    checked={checked}
                    onCheckedChange={(v) => setChecked(v)}
                    label="Accept terms and conditions"
                  />
                  <Checkbox checked label="Already checked" />
                  <Checkbox checked="indeterminate" label="Indeterminate" />
                  <Checkbox disabled label="Disabled" />
                  <Checkbox error="Required" label="With error" />
                </div>
              </div>
              <div>
                <Label>Radio group</Label>
                <RadioGroup defaultValue="balanced" className="space-y-3">
                  <RadioItem value="conservative" label="Conservative" />
                  <RadioItem value="balanced" label="Balanced" />
                  <RadioItem value="aggressive" label="Aggressive" />
                  <RadioItem value="disabled" label="Disabled" disabled />
                </RadioGroup>
              </div>
              <div>
                <Label>Switch</Label>
                <div className="space-y-3">
                  <Switch size="sm" label="Small" defaultChecked />
                  <Switch size="md" label="Notifications" checked={switched} onCheckedChange={setSwitched} />
                  <Switch size="lg" label="Large" />
                  <Switch disabled label="Disabled" />
                </div>
              </div>
            </div>
          </Section>

          {/* Feedback */}
          <Section id="feedback" title="Feedback">
            <Label>Badges — tones × appearances</Label>
            <div className="grid grid-cols-3 gap-3 max-w-2xl">
              {(["neutral","brand","success","warning","error","info"] as const).map((tone) => (
                <div key={tone} className="flex items-center gap-2">
                  <Badge tone={tone}>Filled</Badge>
                  <Badge tone={tone} appearance="soft">Soft</Badge>
                  <Badge tone={tone} appearance="outline">Outline</Badge>
                </div>
              ))}
            </div>
            <Divider className="my-6" />
            <Label>Tags (removable)</Label>
            <Row>
              <Tag tone="neutral" onRemove={() => {}}>Ethereum</Tag>
              <Tag tone="brand">DeFi</Tag>
              <Tag tone="success" onRemove={() => {}}>Active</Tag>
              <Tag tone="warning">Pending</Tag>
              <Tag tone="error" onRemove={() => {}}>Failed</Tag>
              <Tag tone="info">Beta</Tag>
            </Row>
            <Divider className="my-6" />
            <Label>Chips (selectable)</Label>
            <Row>
              {["all","vaults","stables","yield","strategies"].map((id) => (
                <Chip key={id} selected={chip === id} onClick={() => setChip(id)}>
                  {id}
                </Chip>
              ))}
            </Row>
            <Divider className="my-6" />
            <Label>Alerts</Label>
            <div className="space-y-3 max-w-2xl">
              <Alert tone="success" title="Vault deployed" description="Your vault is now active and accepting deposits." />
              <Alert tone="warning" title="Gas is high" description="Ethereum gas is currently over 80 gwei." action={<Button size="sm" variant="secondary">Retry</Button>} />
              <Alert tone="error" title="Transaction failed" description="The transaction was reverted. Please try again." />
              <Alert tone="info" title="New feature" description="NDLP Price Chart is now available in your dashboard." />
            </div>
            <Divider className="my-6" />
            <Label>Progress</Label>
            <div className="space-y-4 max-w-lg">
              <Progress value={35} size="sm" />
              <Progress value={62} size="md" tone="brand" />
              <Progress value={88} size="lg" tone="success" />
              <Progress value={24} size="md" tone="error" />
            </div>
            <Divider className="my-6" />
            <Label>Tooltip</Label>
            <Row>
              <Tooltip content="Top tooltip">
                <Button variant="tertiary">Hover top</Button>
              </Tooltip>
              <Tooltip content="Right tooltip" side="right">
                <Button variant="tertiary">Right</Button>
              </Tooltip>
              <Tooltip content="Bottom tooltip" side="bottom">
                <Button variant="tertiary">Bottom</Button>
              </Tooltip>
              <Tooltip content="Left tooltip" side="left">
                <Button variant="tertiary">Left</Button>
              </Tooltip>
            </Row>
            <Divider className="my-6" />
            <Label>Toast</Label>
            <Row>
              <Button variant="secondary" onClick={() => setToastOpen(true)}>
                Show toast
              </Button>
            </Row>
            <Toast
              tone="success"
              title="Saved"
              description="Your vault settings have been updated."
              open={toastOpen}
              onOpenChange={setToastOpen}
            />
          </Section>

          {/* Overlays */}
          <Section id="overlays" title="Overlays">
            <Label>Modal</Label>
            <ModalRoot>
              <ModalTrigger asChild>
                <Button variant="secondary">Open modal</Button>
              </ModalTrigger>
              <ModalContent size="md">
                <ModalHeader>
                  <ModalTitle>Delete this vault?</ModalTitle>
                  <ModalDescription>This action cannot be undone. All your deposits will be withdrawn.</ModalDescription>
                </ModalHeader>
                <ModalBody>
                  <p className="text-body-md text-text-secondary">
                    You will receive the final distribution in your connected wallet within 24 hours.
                  </p>
                </ModalBody>
                <ModalFooter>
                  <Button variant="tertiary">Cancel</Button>
                  <Button variant="danger">Delete vault</Button>
                </ModalFooter>
              </ModalContent>
            </ModalRoot>

            <Divider className="my-6" />
            <Label>Dropdown Menu</Label>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="secondary">Actions</Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent>
                <DropdownMenuLabel>Vault actions</DropdownMenuLabel>
                <DropdownMenuItem shortcut="⌘E">
                  <Settings size={14} /> Edit vault
                </DropdownMenuItem>
                <DropdownMenuItem shortcut="⌘D">
                  <Download size={14} /> Export data
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem className="text-feedback-error focus:bg-red-700/30">
                  <Trash2 size={14} /> Delete vault
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </Section>

          {/* Data */}
          <Section id="data" title="Data display">
            <Label>Table</Label>
            <div className="rounded-xl border border-border-subtle overflow-hidden">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Vault</TableHead>
                    <TableHead>TVL</TableHead>
                    <TableHead>APY</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead className="w-20 text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {[
                    { name: "Stablecoin · USDC", tvl: "$12,430.50", apy: "8.2%", status: "success" as const },
                    { name: "ETH Yield", tvl: "$48,900.00", apy: "12.4%", status: "brand" as const },
                    { name: "SOL Alpha", tvl: "$3,221.10", apy: "-2.1%", status: "error" as const },
                    { name: "Multi-Chain", tvl: "$81,550.75", apy: "9.6%", status: "warning" as const },
                  ].map((v, i) => (
                    <TableRow key={v.name} selected={i === 0}>
                      <TableCell className="font-medium">{v.name}</TableCell>
                      <TableCell className="tabular-nums">{v.tvl}</TableCell>
                      <TableCell className="tabular-nums">{v.apy}</TableCell>
                      <TableCell>
                        <Badge tone={v.status} appearance="soft">
                          {v.status === "success" ? "Active" : v.status === "error" ? "Paused" : v.status === "brand" ? "New" : "Warning"}
                        </Badge>
                      </TableCell>
                      <TableCell className="text-right">
                        <IconButton icon={<ChevronRight size={16} />} aria-label="Open" variant="ghost" size="sm" />
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
            <Divider className="my-6" />
            <Label>Avatars</Label>
            <Row>
              <Avatar size="xs" initials="NV" />
              <Avatar size="sm" initials="NV" />
              <Avatar size="md" initials="NV" status="online" />
              <Avatar size="lg" initials="NV" status="busy" />
              <Avatar size="xl" initials="NV" status="offline" />
            </Row>
          </Section>

          {/* Navigation */}
          <Section id="navigation" title="Navigation">
            <Label>Breadcrumb</Label>
            <Breadcrumb
              items={[
                { label: "Dashboard", href: "#" },
                { label: "Vaults", href: "#" },
                { label: "Stablecoin · USDC" },
              ]}
            />
            <Divider className="my-6" />
            <Label>Pagination</Label>
            <Pagination page={page} pageCount={12} onPageChange={setPage} />
            <Divider className="my-6" />
            <Label>Tabs</Label>
            <Tabs defaultValue="overview">
              <TabsList>
                <TabsTrigger value="overview">Overview</TabsTrigger>
                <TabsTrigger value="activity">Activity</TabsTrigger>
                <TabsTrigger value="strategy">Strategy</TabsTrigger>
                <TabsTrigger value="disabled" disabled>
                  Advanced
                </TabsTrigger>
              </TabsList>
              <TabsContent value="overview">
                <p className="text-body-md text-text-secondary">Overview content — TVL, APY, recent deposits.</p>
              </TabsContent>
              <TabsContent value="activity">
                <p className="text-body-md text-text-secondary">Activity feed — swaps, rebalances, rewards.</p>
              </TabsContent>
              <TabsContent value="strategy">
                <p className="text-body-md text-text-secondary">Strategy details — risk level, asset allocation.</p>
              </TabsContent>
            </Tabs>
            <Divider className="my-6" />
            <Label>Stepper</Label>
            <Stepper
              current={1}
              steps={[
                { label: "Connect wallet", description: "Choose wallet provider" },
                { label: "Pick strategy", description: "Based on your risk profile" },
                { label: "Deposit", description: "Review and confirm" },
                { label: "Done" },
              ]}
            />
          </Section>

          {/* States */}
          <Section id="states" title="States">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>With header & footer</CardTitle>
                  <CardDescription>Cards use Surface/Elevated and a subtle border.</CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-body-md text-text-secondary">
                    Cards are a flexible surface primitive — compose Header, Content, Footer.
                  </p>
                </CardContent>
                <CardFooter>
                  <span className="text-caption text-text-tertiary">Updated 2 hours ago</span>
                  <Button size="sm">Open</Button>
                </CardFooter>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Loading state</CardTitle>
                  <CardDescription>Skeletons + spinner</CardDescription>
                </CardHeader>
                <CardContent className="space-y-3">
                  <Skeleton className="h-3 w-full" />
                  <Skeleton className="h-3 w-4/5" />
                  <Skeleton className="h-3 w-3/5" />
                  <div className="flex items-center gap-3 pt-2">
                    <Spinner size={18} />
                    <span className="text-body-sm text-text-tertiary">Loading vaults…</span>
                  </div>
                </CardContent>
              </Card>

              <Card className="md:col-span-2">
                <CardContent>
                  <EmptyState
                    icon={<Search size={32} />}
                    title="No vaults found"
                    description="Try adjusting your filters or create a new vault to get started."
                    primaryAction={<Button leadingIcon={<Plus size={14} />}>New vault</Button>}
                    secondaryAction={<Button variant="tertiary">Reset filters</Button>}
                  />
                </CardContent>
              </Card>

              <Card className="md:col-span-2">
                <CardHeader>
                  <CardTitle>Accordion — FAQ</CardTitle>
                </CardHeader>
                <CardContent>
                  <Accordion type="single" collapsible className="space-y-2">
                    <AccordionItem value="a">
                      <AccordionTrigger>What is NODO?</AccordionTrigger>
                      <AccordionContent>NODO is a decentralized vault protocol offering curated strategies.</AccordionContent>
                    </AccordionItem>
                    <AccordionItem value="b">
                      <AccordionTrigger>How are yields generated?</AccordionTrigger>
                      <AccordionContent>Through automated strategies across lending, liquidity, and staking.</AccordionContent>
                    </AccordionItem>
                    <AccordionItem value="c">
                      <AccordionTrigger>What are the fees?</AccordionTrigger>
                      <AccordionContent>A 2% management fee and 20% performance fee — only on profit.</AccordionContent>
                    </AccordionItem>
                  </Accordion>
                </CardContent>
              </Card>
            </div>
          </Section>
        </main>
      </div>
    </div>
  );
}

function Section({
  id,
  title,
  description,
  children,
}: {
  id: string;
  title: string;
  description?: string;
  children: React.ReactNode;
}) {
  return (
    <section id={id} className="scroll-mt-24 space-y-6">
      <div className="space-y-1">
        <p className="text-overline text-brand-300">{id}</p>
        <h2 className="text-h2">{title}</h2>
        {description && <p className="text-body-md text-text-secondary max-w-2xl">{description}</p>}
      </div>
      <div className="rounded-2xl border border-border-subtle bg-surface/50 p-6 md:p-8">{children}</div>
    </section>
  );
}

function Label({ children, className }: { children: React.ReactNode; className?: string }) {
  return <div className={`text-overline text-text-tertiary mb-3 ${className ?? ""}`}>{children}</div>;
}

function Row({ children, className }: { children: React.ReactNode; className?: string }) {
  return <div className={`flex flex-wrap items-center gap-3 ${className ?? ""}`}>{children}</div>;
}

function Swatches({ colors }: { colors: string[] }) {
  return (
    <div className="grid grid-cols-5 md:grid-cols-10 gap-3">
      {colors.map((c) => (
        <div key={c} className="flex flex-col gap-2">
          <div
            className={`aspect-square rounded-lg border border-border-subtle bg-${c}`}
          />
          <div className="text-caption text-text-tertiary truncate">{c}</div>
        </div>
      ))}
    </div>
  );
}
