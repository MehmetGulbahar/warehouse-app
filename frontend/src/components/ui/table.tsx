import * as React from "react"

export interface TableProps extends React.HTMLAttributes<HTMLTableElement> {}

export const Table = React.forwardRef<
  HTMLTableElement,
  TableProps
>(({ className, ...props }, ref) => (
  <div className="w-full overflow-auto">
    <table
      ref={ref}
      className={`w-full caption-bottom text-sm dark:text-gray-200 ${className}`}
      {...props}
    />
  </div>
))
Table.displayName = "Table"

export interface TableHeaderProps extends React.HTMLAttributes<HTMLTableSectionElement> {}

export const TableHeader = React.forwardRef<
  HTMLTableSectionElement,
  TableHeaderProps
>(({ className, ...props }, ref) => (
  <thead ref={ref} className={`border-b dark:border-gray-700 ${className}`} {...props} />
))
TableHeader.displayName = "TableHeader"

export interface TableBodyProps extends React.HTMLAttributes<HTMLTableSectionElement> {}

export const TableBody = React.forwardRef<
  HTMLTableSectionElement,
  TableBodyProps
>(({ className, ...props }, ref) => (
  <tbody
    ref={ref}
    className={className}
    {...props}
  />
))
TableBody.displayName = "TableBody"

export interface TableFooterProps extends React.HTMLAttributes<HTMLTableSectionElement> {}

export const TableFooter = React.forwardRef<
  HTMLTableSectionElement,
  TableFooterProps
>(({ className, ...props }, ref) => (
  <tfoot
    ref={ref}
    className={`border-t bg-muted font-medium ${className}`}
    {...props}
  />
))
TableFooter.displayName = "TableFooter"

export interface TableRowProps extends React.HTMLAttributes<HTMLTableRowElement> {}

export const TableRow = React.forwardRef<
  HTMLTableRowElement,
  TableRowProps
>(({ className, ...props }, ref) => (
  <tr
    ref={ref}
    className={`border-b dark:border-gray-700 transition-colors hover:bg-gray-50 dark:hover:bg-gray-700 data-[state=selected]:bg-gray-100 dark:data-[state=selected]:bg-gray-800 ${className}`}
    {...props}
  />
))
TableRow.displayName = "TableRow"

export interface TableHeadProps extends React.ThHTMLAttributes<HTMLTableCellElement> {}

export const TableHead = React.forwardRef<
  HTMLTableCellElement,
  TableHeadProps
>(({ className, ...props }, ref) => (
  <th
    ref={ref}
    className={`h-12 px-4 text-left align-middle font-medium text-gray-500 dark:text-gray-400 [&:has([role=checkbox])]:pr-0 ${className}`}
    {...props}
  />
))
TableHead.displayName = "TableHead"

export interface TableCellProps extends React.TdHTMLAttributes<HTMLTableCellElement> {}

export const TableCell = React.forwardRef<
  HTMLTableCellElement,
  TableCellProps
>(({ className, ...props }, ref) => (
  <td
    ref={ref}
    className={`p-4 align-middle dark:text-gray-300 [&:has([role=checkbox])]:pr-0 ${className}`}
    {...props}
  />
))
TableCell.displayName = "TableCell"
