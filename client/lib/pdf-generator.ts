import jsPDF from "jspdf"

export async function generatePDF(projectData: any, analysisData: any, projectionData: any) {
  const doc = new jsPDF()
  const pageWidth = doc.internal.pageSize.getWidth()
  const pageHeight = doc.internal.pageSize.getHeight()
  let yPosition = 20

  // Title
  doc.setFontSize(24)
  doc.setTextColor(255, 199, 0)
  doc.text("AI Analysis Report", pageWidth / 2, yPosition, { align: "center" })
  yPosition += 15

  // Project Info
  doc.setFontSize(12)
  doc.setTextColor(255, 255, 255)
  doc.text(`Project: ${projectData.name}`, 20, yPosition)
  yPosition += 8
  doc.setFontSize(10)
  doc.setTextColor(150, 150, 150)
  doc.text(`Generated: ${new Date().toLocaleDateString()}`, 20, yPosition)
  yPosition += 15

  // Summary Section
  doc.setFontSize(14)
  doc.setTextColor(255, 199, 0)
  doc.text("Executive Summary", 20, yPosition)
  yPosition += 10
  doc.setFontSize(10)
  doc.setTextColor(255, 255, 255)
  const summaryText = doc.splitTextToSize(projectData.description || "No description provided", pageWidth - 40)
  doc.text(summaryText, 20, yPosition)
  yPosition += summaryText.length * 5 + 10

  // Metrics Section
  doc.setFontSize(14)
  doc.setTextColor(255, 199, 0)
  doc.text("Evaluation Metrics", 20, yPosition)
  yPosition += 10
  doc.setFontSize(10)
  doc.setTextColor(255, 255, 255)

  analysisData.forEach((metric: any) => {
    doc.text(`${metric.category}: ${metric.score}/100`, 20, yPosition)
    yPosition += 6
  })
  yPosition += 10

  // Project Details
  doc.setFontSize(14)
  doc.setTextColor(255, 199, 0)
  doc.text("Project Details", 20, yPosition)
  yPosition += 10
  doc.setFontSize(10)
  doc.setTextColor(255, 255, 255)
  doc.text(`Budget: $${projectData.budget}`, 20, yPosition)
  yPosition += 6
  doc.text(`Timeline: ${projectData.timeline} months`, 20, yPosition)
  yPosition += 6
  doc.text(`Overall Score: 82/100`, 20, yPosition)
  yPosition += 6
  doc.text(`Recommendation: Highly Recommended`, 20, yPosition)

  // Save PDF
  doc.save(`${projectData.name || "analysis"}-report.pdf`)
}
