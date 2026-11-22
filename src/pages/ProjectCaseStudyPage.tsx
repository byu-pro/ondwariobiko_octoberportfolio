import React from 'react';
import { PageRoute } from '../types';
import { responsiveImageSrcSet } from '../utils/images';

interface ProjectCaseStudyPageProps {
  base: string;
  slug: string;
  onNavigate: (route: PageRoute) => void;
}

interface CaseStudy {
  number: string;
  title: string;
  subtitle: string;
  category: string;
  location: string;
  caseStudyThumbnail: string;
  image: string;
  links: [string, string][];
  context: string;
  challenge: string;
  response: string[];
  value: string;
}

// Obfuscated case study repository data (decrypted dynamically at runtime)
const _ENC_STORE = "eyJwZWxpY2FuLXNvY2lhbCI6eyJudW1iZXIiOiIwMSIsInRpdGxlIjoiUGVsaWNhbiBTb2NpYWwiLCJzdWJ0aXRsZSI6IkEgQ2FyaWJiZWFuIGJhciBhbmQgZ3JpbGwgaW4gU2ltcHNvbiBCYXksIFNpbnQgTWFhcnRlbi4iLCJjYXRlZ29yeSI6IkJyYW5kIGlkZW50aXR5IMK3IFJlc3RhdXJhbnQiLCJsb2NhdGlvbiI6IlNpbXBzb24gQmF5LCBTaW50IE1hYXJ0ZW4iLCJjYXNlU3R1ZHlUaHVtYm5haWwiOiJwZWxpY2Fuc29jaWFsbG9nb19jYXNlc3R1ZHl0aHVtYm5haWwud2VicCIsImltYWdlIjoicGVsaWNhbnNvY2lhbF90aHVtYm5haWxkZXNrdG9wLndlYnAiLCJsaW5rcyI6W1siUGVsaWNhbiBTb2NpYWwgd2Vic2l0ZSIsImh0dHBzOi8vcGVsaWNhbnNvY2lhbHN4bS5jb20vIl0sWyJNYWhvIEdyb3VwIHZlbnVlIHBhZ2UiLCJodHRwczovL21haG93aW5lYW5kZGluZS5jb20vdmVudWVzL3BlbGljYW4tc29jaWFsIl1dLCJjb250ZXh0IjoiUGVsaWNhbiBTb2NpYWwgaXMgYSBiYXIgYW5kIGdyaWxsIGluIFNpbXBzb24gQmF5LCBTaW50IE1hYXJ0ZW4sIHNlcnZpbmcgcmVzb3J0IHZpc2l0b3JzIGFuZCBsb2NhbCBndWVzdHMgaW4gYSBkZXN0aW5hdGlvbiBmdWxsIG9mIGRpbmluZyBjaG9pY2VzLiIsImNoYWxsZW5nZSI6IlRoZSBicmFuZCBuZWVkZWQgdG8gY29tbXVuaWNhdGUgYSB2YXJpZWQsIGZyZXNobHkgcHJlcGFyZWQgbWVudSBhbmQgYSByZWxheGVkIENhcmliYmVhbiBhdG1vc3BoZXJlLCB3aGlsZSBnaXZpbmcgdmlzaXRvcnMgYSBtZW1vcmFibGUgbmFtZSBhbmQgaWRlbnRpdHkgdG8gcmVjb2duaXplLiIsInJlc3BvbnNlIjpbIkNyZWF0ZWQgYSBjb21wbGV0ZSBsb2dvIGFuZCBicmFuZCBpZGVudGl0eSBkaXJlY3Rpb24gYXJvdW5kIHRoZSBQZWxpY2FuIFNvY2lhbCBuYW1lLiIsIkJhbGFuY2VkIGEgcG9saXNoZWQsIHdlbGNvbWluZyByZXN0YXVyYW50IGZlZWwgd2l0aCB0aGUgY2xpZW504oCZcyBib2hvLWNoaWMgQ2FyaWJiZWFuIHNldHRpbmcuIiwiRGVzaWduZWQgdGhlIGlkZW50aXR5IHRvIHdvcmsgYWNyb3NzIGRpZ2l0YWwgdG91Y2hwb2ludHMgYW5kIG9uLXByZW1pc2UgY3VzdG9tZXIgbWF0ZXJpYWxzLiJdLCJ2YWx1ZSI6IkEgZGlzdGluY3RpdmUgaWRlbnRpdHkgZ2l2ZXMgZ3Vlc3RzIGEgY2xlYXJlciBzZW5zZSBvZiB0aGUgZXhwZXJpZW5jZSBiZWZvcmUgdGhleSBhcnJpdmUgYW5kIGhlbHBzIHRoZSByZXN0YXVyYW50IHN0YW5kIGFwYXJ0IGluIGEgYnVzeSByZXNvcnQgZGVzdGluYXRpb24uIn0sImlrb24tdHJhaWxlcnMiOnsibnVtYmVyIjoiMDIiLCJ0aXRsZSI6IklLT04gVHJhaWxlcnMiLCJzdWJ0aXRsZSI6IkEgaGVhdnktZHV0eSB0cmFpbGVyIGRlYWxlciBzZXJ2aW5nIG93bmVyLW9wZXJhdG9ycyBhbmQgYnVzaW5lc3NlcyBpbiBTYW4gQW50b25pbywgVGV4YXMuIiwiY2F0ZWdvcnkiOiJCcmFuZCBpZGVudGl0eSDCtyBJbmR1c3RyaWFsIiwibG9jYXRpb24iOiJTYW4gQW50b25pbywgVGV4YXMsIFVTQSIsImNhc2VTdHVkeVRodW1ibmFpbCI6Imlrb250cmFpbGVyc2xvZ29fY2FzZXN0dWR5dGh1bWJuYWlsLndlYnAiLCJpbWFnZSI6Imlrb250cmFpbGVyc190aHVtYm5haWxsZGVza3RvcC53ZWJwIiwibGlua3MiOltbIklLT04gVHJhaWxlcnMgd2Vic2l0ZSIsImh0dHBzOi8vaWtvbnRyYWlsZXJzLmNvbS8iXV0sImNvbnRleHQiOiJJS09OIFRyYWlsZXJzIHNlbGxzIGhlYXZ5LWR1dHkgdHJhaWxlcnMgaW4gU2FuIEFudG9uaW8sIFRleGFzLCBzZXJ2aW5nIG93bmVyLW9wZXJhdG9ycyBhcyB3ZWxsIGFzIGxhcmdlIGNvcnBvcmF0ZSBidXllcnMgYWNyb3NzIHNldmVyYWwgdHJhaWxlciBjYXRlZ29yaWVzLiIsImNoYWxsZW5nZSI6IlRoZSBidXNpbmVzcyB3YW50ZWQgaXRzIGlkZW50aXR5IHRvIGV4cHJlc3MgdGhlIHN0cmVuZ3RoIGFuZCBoaWdoIHN0YW5kYXJkcyBiZWhpbmQgdGhlIElLT04gbmFtZSwgd2hpbGUgZWFybmluZyBjb25maWRlbmNlIGZyb20gYnV5ZXJzIHdpdGggdmVyeSBkaWZmZXJlbnQgb3BlcmF0aW5nIHNjYWxlcy4iLCJyZXNwb25zZSI6WyJEZXZlbG9wZWQgYSBsb2dvIGFuZCBicmFuZCBpZGVudGl0eSBmb3IgYSBoZWF2eS1kdXR5IHRyYWlsZXIgZGVhbGVyLiIsIlVzZWQgYSBzdHJvbmcsIGFzc3VyZWQgdmlzdWFsIGNoYXJhY3RlciBzdWl0ZWQgdG8gYW4gaW5kdXN0cmlhbCBzYWxlcyBlbnZpcm9ubWVudC4iLCJLZXB0IHRoZSBpZGVudGl0eSBmb2N1c2VkIG9uIHRoZSBJS09OIG5hbWUgYW5kIHRoZSBxdWFsaXR5IG9mIHRoZSBzZXJ2aWNlIGl0IHJlcHJlc2VudHMuIl0sInZhbHVlIjoiQSBjbGVhciwgcHJvZmVzc2lvbmFsIGlkZW50aXR5IGhlbHBzIHRoZSBidXNpbmVzcyBwcmVzZW50IGl0c2VsZiBjb25zaXN0ZW50bHkgdG8gaW5kaXZpZHVhbCBvcGVyYXRvcnMgYW5kIGVudGVycHJpc2UgYnV5ZXJzLCBzdXBwb3J0aW5nIHRydXN0IGF0IHRoZSBzdGFydCBvZiBhIGNvbnNpZGVyZWQgcHVyY2hhc2UuIn0sImlyb24tYWNyZSI6eyJudW1iZXIiOiIwMyIsInRpdGxlIjoiSXJvbiBBY3JlIExhbmQgQ28iLCJzdWJ0aXRsZSI6IkFuIGV4Y2F2YXRpb24gYW5kIGxhbmQgbWFuYWdlbWVudCBjb21wYW55IHNlcnZpbmcgbGFuZG93bmVycyBhbmQgaG9tZW93bmVycy4iLCJjYXRlZ29yeSI6IkJyYW5kIGlkZW50aXR5IMK3IENvbnN0cnVjdGlvbiIsImxvY2F0aW9uIjoiVW5pdGVkIFN0YXRlcyIsImNhc2VTdHVkeVRodW1ibmFpbCI6Imlyb25hY3JlbG9nb19jYXNlc3R1ZHl0aHVtYm5haWwud2VicCIsImltYWdlIjoiaXJvbmFjcmVfdGh1bWJuYWlsZGVza3RvcC53ZWJwIiwibGlua3MiOltbIklyb24gQWNyZSBMYW5kIENvIHdlYnNpdGUiLCJodHRwczovL3d3dy5pcm9uYWNyZWxhbmRjby5jb20vIl1dLCJjb250ZXh0IjoiSXJvbiBBY3JlIExhbmQgQ28gcHJvdmlkZXMgZXhjYXZhdGlvbiBhbmQgbGFuZCBtYW5hZ2VtZW50IGZvciBsYW5kb3duZXJzIGFuZCBob21lb3duZXJzLCB3aXRoIHdvcmsgc3Bhbm5pbmcgbGFuZCwgZXF1aW5lLCBhbmQgY29udHJhY3RvciBzZXR0aW5ncy4iLCJjaGFsbGVuZ2UiOiJUaGUgbG9nbyBuZWVkZWQgdG8gZmVlbCB0b3VnaCBhbmQgdW5jb21wbGljYXRlZCwgcmVwcm9kdWNlIGNsZWFybHkgb24gdHJ1Y2tzLCBtYWNoaW5lcnksIHdvcmt3ZWFyLCBhbmQgaGF0cywgYW5kIGF2b2lkIG5hcnJvd2luZyB0aGUgY29tcGFueSB0byBvbmx5IGEgZmFybSBvciBob3JzZSBhdWRpZW5jZS4iLCJyZXNwb25zZSI6WyJCdWlsdCB0aGUgaWRlbnRpdHkgYXJvdW5kIHRoZSBmdWxsIElyb24gQWNyZSBMYW5kIENvIG5hbWUuIiwiS2VwdCB0aGUgdmlzdWFsIGRpcmVjdGlvbiBzaW1wbGUsIHN0cm9uZywgYW5kIGdyb3VuZGVkIGluIHRoZSBjbGllbnTigJlzIGJsYWNrLWFuZC13aGl0ZSBwcmVmZXJlbmNlLiIsIkRlc2lnbmVkIGZvciBwcmFjdGljYWwgcmVjb2duaXRpb24gYWNyb3NzIHZlaGljbGVzLCBlcXVpcG1lbnQsIGNsb3RoaW5nLCBhbmQgc21hbGwtZm9ybWF0IHVzZXMuIl0sInZhbHVlIjoiQSB2ZXJzYXRpbGUgaWRlbnRpdHkgbWFrZXMgaXQgZWFzaWVyIGZvciBjdXN0b21lcnMgYW5kIHBhcnRuZXJzIHRvIHJlY29nbml6ZSB0aGUgY29tcGFueSB3aGVyZXZlciB0aGUgd29yayBoYXBwZW5zLCBmcm9tIGEgam9iIHNpdGUgdG8gYSBmaXJzdCBjb252ZXJzYXRpb24uIn0sImZyaWVuZHMtb2YtdW5pb252aWxsZSI6eyJudW1iZXIiOiIwNCIsInRpdGxlIjoiRnJpZW5kcyBvZiBVbmlvbnZpbGxlIiwic3VidGl0bGUiOiJBIG5vbnByb2ZpdCBjYXJpbmcgZm9yIHRoZSBoaXN0b3JpYyB2aWxsYWdlIG9mIFVuaW9udmlsbGUsIFBlbm5zeWx2YW5pYSwgaW4gcGFydG5lcnNoaXAgd2l0aCBpdHMgY29tbXVuaXR5LiIsImNhdGVnb3J5IjoiQnJhbmQgaWRlbnRpdHkgwrcgTm9uLXByb2ZpdCIsImxvY2F0aW9uIjoiVW5pb252aWxsZSwgUGVubnN5bHZhbmlhLCBVU0EiLCJjYXNlU3R1ZHlUaHVtYm5haWwiOiJmcmllbmRzb2Z1bmlvbnZpbGxlbG9nb19jYXNlc3R1ZHl0aHVtYm5haWwud2VicCIsImltYWdlIjoiZnJpZW5kc29mdW5pb252aWxsZV9kZXNrdG9wdGh1bWJuYWlsLndlYnAiLCJsaW5rcyI6W1siRnJpZW5kcyBvZiBVbmlvbnZpbGxlIHdlYnNpdGUiLCJodHRwczovL3d3dy5mcmllbmRzb2Z1bmlvbnZpbGxlLm9yZy8iXV0sImNvbnRleHQiOiJGcmllbmRzIG9mIFVuaW9udmlsbGUgaXMgYSBuZXcgbm9uLXByb2ZpdCB3b3JraW5nIHdpdGggcmVzaWRlbnRzLCBsb2NhbCBidXNpbmVzc2VzLCBhbmQgc3Rha2Vob2xkZXJzIHRvIHN0ZXdhcmQgYSBoaXN0b3JpYyB2aWxsYWdlIGFuZCBpdHMgcHVibGljIHNwYWNlcy4iLCJjaGFsbGVuZ2UiOiJBcyBhIG5ldyBvcmdhbml6YXRpb24sIGl0IG5lZWRlZCBhIHJlY29nbml6YWJsZSBpZGVudGl0eSB0aGF0IGNvdWxkIGV4cHJlc3MgaGVyaXRhZ2UsIGNvbm5lY3Rpb24sIHdhbGthYmlsaXR5LCBhbmQgY2FyZSBmb3IgdGhlIHZpbGxhZ2XigJlzIGZ1dHVyZSB3aXRob3V0IGJsZW5kaW5nIGludG8gbG9jYWwgb3JnYW5pemF0aW9ucyBhbHJlYWR5IHVzaW5nIGJsdWUuIiwicmVzcG9uc2UiOlsiQ3JlYXRlZCBhIGxvZ28gZGlyZWN0aW9uIGZvciB0aGUgRnJpZW5kcyBvZiBVbmlvbnZpbGxlIG5hbWUgYW5kIOKAnEVzdC4gMjAyNeKAnSBkZXRhaWwuIiwiRXhwbG9yZWQgYSBtYXR1cmUsIHNvcGhpc3RpY2F0ZWQgdmlzdWFsIHN0eWxlIHVzaW5nIGdyZWVucywgcmVkcywgYW5kIG90aGVyIHN1aXRhYmxlIGNvbG9ycy4iLCJDb25uZWN0ZWQgdGhlIGlkZW50aXR5IHRvIHRoZSB2aWxsYWdl4oCZcyBjcm9zc3JvYWRzLCBoaXN0b3JpYyBjaGFyYWN0ZXIsIGFuZCBjb2xsYWJvcmF0aXZlIG1pc3Npb24uIl0sInZhbHVlIjoiQSBjbGVhciBpZGVudGl0eSBnaXZlcyB0aGUgb3JnYW5pemF0aW9uIGEgY29uc2lzdGVudCB3YXkgdG8gaW50cm9kdWNlIGl0cyBtaXNzaW9uLCBidWlsZCByZWNvZ25pdGlvbiwgYW5kIGJyaW5nIGNvbW11bml0eSBpbml0aWF0aXZlcyB1bmRlciBvbmUgc2hhcmVkIGJhbm5lci4ifSwic291bmQtY3VydmVzIjp7Im51bWJlciI6IjA1IiwidGl0bGUiOiJTb3VuZEN1cnZlcyIsInN1YnRpdGxlIjoiQSBwcmVtaXVtIGVhcnBob25lIGJyYW5kIGZvciBhdWRpbyBlbnRodXNpYXN0cyBhbmQgcGVvcGxlIGV4cGxvcmluZyBoaWdoLWVuZCBzb3VuZC4iLCJjYXRlZ29yeSI6IldlYnNpdGUgZGVzaWduIMK3IENvbnN1bWVyIHRlY2hub2xvZ3kiLCJsb2NhdGlvbiI6IkNsaWVudCBsb2NhdGlvbiBub3Qgc3BlY2lmaWVkIiwiY2FzZVN0dWR5VGh1bWJuYWlsIjoicWJ5c291bmRjdXJ2ZXNsb2dvX2Nhc2VzdHVkeXRodW1ibmFpbC53ZWJwIiwiaW1hZ2UiOiJzb3VuZGN1cnZlc190aHVtYm5haWxkZXNrdG9wLndlYnAiLCJsaW5rcyI6W10sImNvbnRleHQiOiJTb3VuZEN1cnZlcyBzZWxscyBwcmVtaXVtIGVhcnBob25lcyBwcmljZWQgYXQgJDc5OSB0byB0d28gZ3JvdXBzOiBleHBlcmllbmNlZCBhdWRpbyBlbnRodXNpYXN0cyBhbmQgcGVvcGxlIHdobyBoYXZlIG5vdCB5ZXQgdHJpZWQgcHJlbWl1bSBhdWRpby4iLCJjaGFsbGVuZ2UiOiJUaGUgd2Vic2l0ZSBuZWVkZWQgdG8gc2VydmUgYm90aCBhdWRpZW5jZXM6IGdpdmUga25vd2xlZGdlYWJsZSBidXllcnMgdGhlIHByb2R1Y3QgYW5kIHRlY2hub2xvZ3kgZGV0YWlsIHRoZXkgZXhwZWN0LCB3aGlsZSBoZWxwaW5nIG5ld2NvbWVycyB1bmRlcnN0YW5kIHdoeSB0aGUgbGlzdGVuaW5nIGV4cGVyaWVuY2UgbWVyaXRzIHRoZSBpbnZlc3RtZW50LiIsInJlc3BvbnNlIjpbIlBsYW5uZWQgYSBmaXZlLXBhZ2UgZXhwZXJpZW5jZSBjb3ZlcmluZyB0aGUgaG9tZSwgcHJvZHVjdCwgdGVjaG5vbG9neSwgYW5kIHR3byBjYW1wYWlnbiBsYW5kaW5nIHBhZ2VzLiIsIk9yZ2FuaXplZCBuYXZpZ2F0aW9uIGFuZCBwYWdlIGNvbnRlbnQgYXJvdW5kIHByb2R1Y3QgZGlzY292ZXJ5LCBlZHVjYXRpb24sIGFuZCBjbGVhciBuZXh0IHN0ZXBzLiIsIkRlc2lnbmVkIGRlc2t0b3AgYW5kIG1vYmlsZSBsYXlvdXRzIHRvIHN1cHBvcnQgYm90aCBjb21wYXJpc29uLW1pbmRlZCB2aXNpdG9ycyBhbmQgZmlyc3QtdGltZSBwcmVtaXVtIGJ1eWVycy4iXSwidmFsdWUiOiJBIHdlbGwtc3RydWN0dXJlZCBwcm9kdWN0IGV4cGVyaWVuY2UgY2FuIG1ha2UgYSBoaWdoLWNvbnNpZGVyYXRpb24gb2ZmZXIgZWFzaWVyIHRvIGV2YWx1YXRlLCBleHBsYWluIHByb2R1Y3QgdmFsdWUgY2xlYXJseSwgYW5kIGd1aWRlIGludGVyZXN0ZWQgdmlzaXRvcnMgdG93YXJkIGEgcHVyY2hhc2UgZGVjaXNpb24uIn0sIm1vb2RzLWFuZC1uZXJkcyI6eyJudW1iZXIiOiIwNiIsInRpdGxlIjoiTW9vZHMgTiBNZWRzIiwic3VidGl0bGUiOiJBIGRpZ2l0YWwgd2VsbG5lc3MgY29uY2VwdCBmb3IgYW54aWV0eSBzdXBwb3J0LCBtb29kIHRyYWNraW5nLCBhbmQgbWVkaWNhdGlvbiByZXZpZXdzLiIsImNhdGVnb3J5IjoiV2Vic2l0ZSBkZXNpZ24gwrcgRGlnaXRhbCB3ZWxsbmVzcyIsImxvY2F0aW9uIjoiQ2xpZW50IGxvY2F0aW9uIG5vdCBzcGVjaWZpZWQiLCJjYXNlU3R1ZHlUaHVtYm5haWwiOiJtb29kc25tZWRzbGxvZ29fY2FzZXN0dWR5dGh1bWJuYWlsLndlYnAiLCJpbWFnZSI6Im1vb2RubWVkc190aHVtYm5haWxkZXNrdG9wLndlYnAiLCJsaW5rcyI6W10sImNvbnRleHQiOiJNb29kcyBOIE1lZHMgaXMgYSBkaWdpdGFsIHdlbGxuZXNzIGNvbmNlcHQgZm9yIHBlb3BsZSBleHBlcmllbmNpbmcgYW54aWV0eSwgY29tYmluaW5nIGNhbG1pbmcgY29udGVudCB3aXRoIHRvb2xzIGZvciBkYWlseSBtb29kIGxvZ2dpbmcgYW5kIG1lZGljYXRpb24gcmV2aWV3cy4iLCJjaGFsbGVuZ2UiOiJUaGUgZXhwZXJpZW5jZSBuZWVkZWQgdG8gZmVlbCB2aWJyYW50IHlldCBjYWxtIGFuZCBtYWtlIHNldmVyYWwgdGFza3MgZWFzeSB0byB1bmRlcnN0YW5kOiBmaW5kaW5nIHJlbGllZiByZXNvdXJjZXMsIHJlY29yZGluZyBhIGRhaWx5IG1vb2QsIHZpZXdpbmcgcGFzdCBsb2dzLCB3cml0aW5nIG1lZGljYXRpb24gcmV2aWV3cywgYW5kIGNyZWF0aW5nIGFuIGFjY291bnQuIiwicmVzcG9uc2UiOlsiRGVzaWduZWQgYSBjb25zaXN0ZW50IHZpc3VhbCBkaXJlY3Rpb24gYWNyb3NzIGZpdmUgcGFnZXM6IGhvbWUsIGRhaWx5IGxvZywgcmVzdWx0cywgcmV2aWV3cywgYW5kIHNpZ24tdXAuIiwiVXNlZCBhIGNhbG0gdmlzdWFsIGF0bW9zcGhlcmUgaW5mb3JtZWQgYnkgdGhlIGNsaWVudOKAmXMgaW50ZXJlc3QgaW4gbmF0dXJlIGFuZCBKYXBhbmVzZSBnYXJkZW4gcmVmZXJlbmNlcy4iLCJTdHJ1Y3R1cmVkIHRoZSBrZXkgYWN0aW9ucyBhbmQgaW5mb3JtYXRpb24gc28gdXNlcnMgY2FuIHVuZGVyc3RhbmQgd2hhdCBlYWNoIHBhZ2UgaXMgZm9yLiJdLCJ2YWx1ZSI6IkEgdGhvdWdodGZ1bCBpbnRlcmZhY2UgaGVscHMgdGhlIHNlcnZpY2UgY29tbXVuaWNhdGUgaXRzIHB1cnBvc2UgYW5kIG1ha2VzIGl0cyB0b29scyBlYXNpZXIgdG8gbmF2aWdhdGUuIEl0IHN1cHBvcnRzIHRoZSBwcm9kdWN0IGV4cGVyaWVuY2Ugd2l0aG91dCBwcm9taXNpbmcgYSBtZWRpY2FsIG91dGNvbWUuIn0sImdyZWVuLWVzc2VudGlhbCI6eyJudW1iZXIiOiIwNyIsInRpdGxlIjoiR3JlZW4gRXNzZW50aWFscyIsInN1YnRpdGxlIjoiQSBob21lIHNlcnZpY2VzIGNvbXBhbnkgb2ZmZXJpbmcgbGF3biBmZXJ0aWxpemF0aW9uLCB3ZWVkIGNvbnRyb2wsIGFuZCBtb3NxdWl0byB0cmVhdG1lbnRzLiIsImNhdGVnb3J5IjoiTG9nbyBkZXNpZ24gwrcgSG9tZSBzZXJ2aWNlcyIsImxvY2F0aW9uIjoiTG9nYW52aWxsZSwgR2VvcmdpYSwgVVNBIiwiY2FzZVN0dWR5VGh1bWJuYWlsIjoiZ3JlZW5lc3NlbnRpYWxzbG9nb19jYXNlc3R1ZHl0aHVtYm5haWwud2VicCIsImltYWdlIjoiZ3JlZW5lc3NlbnRpYWxfdGh1bWJuYWlsZGVza3RvcC53ZWJwIiwibGlua3MiOltbIkdyZWVuIEVzc2VudGlhbHMgd2Vic2l0ZSIsImh0dHBzOi8vd3d3LmdyZWVuZXNzZW50aWFscy5pbmZvLyJdLFsiR3JlZW4gRXNzZW50aWFscyBwcm9maWxlIiwiaHR0cHM6Ly93d3cuYWxpZ25hYmxlLmNvbS9sb2dhbnZpbGxlLWdhL2dyZWVuLWVzc2VudGlhbHMtbGF3bi1zZXJ2aWNlIl1dLCJjb250ZXh0IjoiR3JlZW4gRXNzZW50aWFscyBvZmZlcnMgbGF3biBmZXJ0aWxpemF0aW9uLCB3ZWVkIGNvbnRyb2wsIGFuZCBtb3NxdWl0byB0cmVhdG1lbnRzIHRvIHBlb3BsZSB3aG8gd2FudCBhIGhlYWx0aGllciBsYXduIGFuZCBhIG1vcmUgY29tZm9ydGFibGUgeWFyZC4iLCJjaGFsbGVuZ2UiOiJUaGUgbG9nbyBuZWVkZWQgdG8gbWFrZSB0d28gcmVsYXRlZCBzZXJ2aWNlc+KAlGxhd24gY2FyZSBhbmQgbW9zcXVpdG8gY29udHJvbOKAlGNsZWFyIHRvIGhvbWVvd25lcnMgYXQgYSBnbGFuY2UuIiwicmVzcG9uc2UiOlsiRGV2ZWxvcGVkIGEgbG9nbyBkaXJlY3Rpb24gZm9yIHRoZSBHcmVlbiBFc3NlbnRpYWxzIG5hbWUuIiwiQnJvdWdodCB0aGUgbGF3biBhbmQgbW9zcXVpdG8gc2VydmljZSBjdWVzIHRvZ2V0aGVyIGluIG9uZSB2aXN1YWwgaWRlbnRpdHkuIiwiRXhwbG9yZWQgYSBibHVlLWFuZC1ncmVlbiBwYWxldHRlIHN1aXRlZCB0byB0aGUgZW52aXJvbm1lbnRhbCBhbmQgb3V0ZG9vciBzZXJ2aWNlIGNhdGVnb3J5LiJdLCJ2YWx1ZSI6IkNsZWFyIHNlcnZpY2UgY3VlcyBjYW4gaGVscCBob21lb3duZXJzIHF1aWNrbHkgdW5kZXJzdGFuZCB3aGF0IHRoZSBidXNpbmVzcyBvZmZlcnMgYW5kIHJlbWVtYmVyIGl0IHdoZW4gdGhleSBhcmUgcmVhZHkgdG8gaW1wcm92ZSB0aGVpciBvdXRkb29yIHNwYWNlLiJ9LCJsZXdpcy1wYXJrIjp7Im51bWJlciI6IjA4IiwidGl0bGUiOiJMZXdpcyBQYXJrIFBpY2tsZWJhbGwiLCJzdWJ0aXRsZSI6IkEgbmVpZ2hib3Job29kIHBpY2tsZWJhbGwgZ3JvdXAgYnJpbmdpbmcgbG9jYWwgcGxheWVycyB0b2dldGhlciBpbiBTYWNyYW1lbnRvLCBDYWxpZm9ybmlhLiIsImNhdGVnb3J5IjoiQXBwYXJlbCBkZXNpZ24gwrcgQ29tbXVuaXR5IiwibG9jYXRpb24iOiJTYWNyYW1lbnRvLCBDYWxpZm9ybmlhLCBVU0EiLCJjYXNlU3R1ZHlUaHVtYm5haWwiOiJsZXdpc3Bhcmtsb2dvX2Nhc2VzdHVkeXRodW1ibmFpbC53ZWJwIiwiaW1hZ2UiOiJsZXdpc3BhcmtfdGh1bWJuYWlsZGVza3RvcC53ZWJwIiwibGlua3MiOltdLCJjb250ZXh0IjoiQSBkaXZlcnNlIGdyb3VwIG9mIGFkdWx0cyBwbGF5cyBwaWNrbGViYWxsIHJlZ3VsYXJseSBhdCBMZXdpcyBQYXJrIGluIFNhY3JhbWVudG8sIENhbGlmb3JuaWEsIGJyaW5naW5nIG5laWdoYm9ycyB0b2dldGhlciBmb3IgZnJpZW5kc2hpcCBhbmQgZXhlcmNpc2UuIiwiY2hhbGxlbmdlIjoiVGhlIHNoaXJ0IGdyYXBoaWMgbmVlZGVkIHRvIGFwcGVhbCBhY3Jvc3MgZ2VuZGVycyBhbmQgYWdlcywgcmVhZCBjbGVhcmx5IGluIGdyb3VwIHBob3RvcywgYW5kIGdpdmUgTGV3aXMgUGFyayBncmVhdGVyIHByb21pbmVuY2UgdGhhbiB0aGUgY2l0eSBsaW5lLiIsInJlc3BvbnNlIjpbIkNyZWF0ZWQgYSB0d28tY29sb3IgZGVzaWduIGZvciBuYXZ5IHNoaXJ0cyB1c2luZyB3aGl0ZSBhbmQgbmVvbiBncmVlbi4iLCJNYWRlIOKAnExld2lzIFBhcmvigJ0gdGhlIHByaW1hcnkgbWVzc2FnZSwgd2l0aCDigJxTYWNyYW1lbnRvLCBDYWxpZm9ybmlh4oCdIGluIGEgc3VwcG9ydGluZyByb2xlLiIsIkRlc2lnbmVkIHRoZSBncmFwaGljIGZvciBlYXN5IHJlYWRpbmcgYW5kIGEgc2hhcmVkIHNlbnNlIG9mIGdyb3VwIGlkZW50aXR5LiJdLCJ2YWx1ZSI6IkEgcmVjb2duaXphYmxlIGdyb3VwIHNoaXJ0IGhlbHBzIHBhcnRpY2lwYW50cyBmZWVsIGNvbm5lY3RlZCBhbmQgbWFrZXMgdGhlIHBhcmsgY29tbXVuaXR5IGVhc2llciB0byBpZGVudGlmeSBpbiBwaG90b3MgYW5kIGF0IGxvY2FsIGV2ZW50cy4ifX0=";

function _decodeRepositoryData<T>(rawBase64: string): T {
  try {
    if (typeof window !== "undefined" && typeof window.atob === "function") {
      const bin = window.atob(rawBase64);
      const uint8 = Uint8Array.from(bin, (c) => c.charCodeAt(0));
      return JSON.parse(new TextDecoder().decode(uint8));
    }
  } catch {
    // Graceful fallback
  }
  return {} as T;
}

const caseStudies: Record<string, CaseStudy> = _decodeRepositoryData<Record<string, CaseStudy>>(_ENC_STORE);

export function ProjectCaseStudyPage({ base, slug, onNavigate }: ProjectCaseStudyPageProps) {
  const project = caseStudies[slug as keyof typeof caseStudies];
  const projectOrder = Object.entries(caseStudies);
  const currentIndex = projectOrder.findIndex(([projectSlug]) => projectSlug === slug);
  const [previousSlug, previousProject] = projectOrder[(currentIndex - 1 + projectOrder.length) % projectOrder.length];
  const [nextSlug, nextProject] = projectOrder[(currentIndex + 1) % projectOrder.length];
  if (!project) {
    return (
      <main className="px-5 md:px-8 pt-40 pb-24 min-h-[60vh]">
        <div className="max-w-[1000px] mx-auto">
          <p className="font-mono text-xs uppercase tracking-[0.25em] text-accent-ink mb-5">Project not found</p>
          <h1 className="font-display font-extrabold uppercase tracking-tighter text-5xl sm:text-7xl">Let’s find the right work</h1>
          <button onClick={() => onNavigate('work')} className="mt-8 rounded-full bg-neon px-7 py-4 font-mono text-xs font-bold uppercase tracking-[0.2em] text-black">Back to selected work ↗</button>
        </div>
      </main>
    );
  }

  const needsCompactTitle = project.title === 'IKON Trailers' || project.title === 'Iron Acre Land Co' || project.title === 'Friends of Unionville' || project.title === 'Green Essentials' || project.title === 'Lewis Park Pickleball';

  return (
    <main className="w-full overflow-x-hidden">
      <section className="px-5 md:px-8 pt-32 sm:pt-40 md:pt-48 pb-10 sm:pb-14">
        <div className="max-w-[1400px] mx-auto">
          <button onClick={() => onNavigate('work')} className="font-mono text-[10px] sm:text-xs uppercase tracking-[0.2em] text-ink/55 hover:text-accent-ink transition-colors">← All projects</button>
          <div className="mt-10 sm:mt-14 grid grid-cols-1 gap-8 xl:grid-cols-[minmax(0,2fr)_minmax(16rem,1fr)] xl:gap-14 items-start">
            <div className="min-w-0">
              <p className="mb-4 font-mono text-[10px] sm:text-xs uppercase tracking-[0.25em] text-accent-ink">{project.number} / {project.category}</p>
              <h1 className={`max-w-full break-normal text-balance font-display font-extrabold uppercase tracking-tighter leading-[0.92] ${needsCompactTitle ? 'text-[clamp(1.5rem,8vw,5.5rem)]' : 'text-[clamp(2.25rem,8vw,7rem)]'}`}>{project.title === 'SoundCurves' ? <>Sound<wbr />Curves</> : project.title}</h1>
              <p className="mt-4 max-w-3xl font-sans text-lg sm:text-xl xl:text-2xl text-ink/75 leading-snug">{project.subtitle}</p>
            </div>
            <div className="min-w-0 xl:pt-1">
              <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-ink/45 mb-3">Project focus</p>
              <p className="max-w-[42ch] font-sans text-sm sm:text-base text-ink/70 leading-relaxed">Business challenge, creative response, and the value the work is designed to support.</p>
            </div>
          </div>
        </div>
      </section>

      <section className="w-full pb-12 sm:pb-16">
        <img src={`${base}images/${project.caseStudyThumbnail}`} srcSet={responsiveImageSrcSet(`${base}images/${project.caseStudyThumbnail}`)} sizes="100vw" alt={`${project.title} project thumbnail`} width={1920} height={960} loading="eager" fetchPriority="high" decoding="async" className="block h-auto w-full object-cover" />
        <div className="max-w-[1400px] mx-auto px-5 md:px-8">
          <aside className="mt-12 sm:mt-14 rounded-2xl border border-white/10 bg-white/[0.025] p-6 sm:p-8 flex flex-col sm:flex-row sm:items-center justify-between gap-6">
            <div><p className="font-mono text-[10px] uppercase tracking-[0.25em] text-accent-ink">Client</p><h2 className="mt-3 font-display uppercase font-bold text-2xl sm:text-3xl">{project.title}</h2><p className="mt-3 font-sans text-sm text-ink/60">{project.location}</p></div>
            {project.links.length > 0 && <div className="flex flex-wrap gap-3">{project.links.map(([label, url]) => <a key={url} href={url} target="_blank" rel="noopener noreferrer" className="rounded-full border border-ink/20 px-5 py-3 font-mono text-[10px] uppercase tracking-[0.15em] hover:border-neon hover:text-accent-ink transition-all duration-300 hover:-translate-y-0.5">{label} ↗</a>)}</div>}
          </aside>
        </div>
      </section>

      <section className="px-5 md:px-8 pb-16 sm:pb-24">
        <div className="max-w-[1400px] mx-auto rounded-2xl bg-neon text-black p-6 sm:p-10 md:p-14 grid md:grid-cols-12 gap-8 items-start">
          <div className="md:col-span-4"><p className="font-mono text-[10px] uppercase tracking-[0.25em] text-black/60 mb-3">Project scope</p><h2 className="font-display uppercase font-extrabold tracking-tight text-3xl sm:text-4xl">What the client needed</h2></div>
          <div className="md:col-span-8"><p className="font-sans text-lg sm:text-xl leading-relaxed">{project.challenge}</p><p className="mt-5 font-mono text-[10px] uppercase tracking-[0.2em] text-black/60">{project.category}</p></div>
        </div>
      </section>

      <section className="px-5 md:px-8 pb-16 sm:pb-24">
        <div className="max-w-[1400px] mx-auto">
          <div className="flex items-end justify-between gap-6 mb-7">
            <div><p className="font-mono text-[10px] uppercase tracking-[0.25em] text-accent-ink mb-3">Project imagery</p><h2 className="font-display font-extrabold uppercase tracking-tighter text-3xl sm:text-4xl">The work in detail</h2></div>
            <p className="hidden sm:block font-mono text-[10px] uppercase tracking-wider text-ink/40">Image sizes shown at 2× export resolution</p>
          </div>
          <div className="grid md:grid-cols-12 gap-4 sm:gap-5">
            <div className="md:col-span-7 aspect-[16/10] rounded-2xl border border-dashed border-ink/25 bg-white/[0.025] grid place-items-center text-center p-6 transition-colors duration-500 hover:border-neon/70 hover:bg-neon/[0.035]"><div><span className="font-mono text-[10px] uppercase tracking-[0.2em] text-accent-ink">01 / Featured visual</span><p className="mt-2 font-display uppercase text-xl sm:text-2xl">1920 × 1200 px</p><p className="mt-2 font-sans text-xs text-ink/45">16:10 · JPG or WebP</p></div></div>
            <div className="md:col-span-5 aspect-[4/5] rounded-2xl border border-dashed border-ink/25 bg-white/[0.025] grid place-items-center text-center p-6 transition-colors duration-500 hover:border-neon/70 hover:bg-neon/[0.035]"><div><span className="font-mono text-[10px] uppercase tracking-[0.2em] text-accent-ink">02 / Detail or mobile view</span><p className="mt-2 font-display uppercase text-xl sm:text-2xl">1200 × 1500 px</p><p className="mt-2 font-sans text-xs text-ink/45">4:5 · JPG or WebP</p></div></div>
            <div className="md:col-span-12 aspect-[2/1] rounded-2xl border border-dashed border-ink/25 bg-white/[0.025] grid place-items-center text-center p-6 transition-colors duration-500 hover:border-neon/70 hover:bg-neon/[0.035]"><div><span className="font-mono text-[10px] uppercase tracking-[0.2em] text-accent-ink">03 / Wide application or process image</span><p className="mt-2 font-display uppercase text-xl sm:text-2xl">2400 × 1200 px</p><p className="mt-2 font-sans text-xs text-ink/45">2:1 · JPG or WebP</p></div></div>
          </div>
          <p className="mt-4 font-sans text-xs text-ink/45">The full width project thumbnail appears above. The slots here show recommended sizes for additional visuals; place those files in <code className="text-accent-ink">public/images/case-studies/</code> when ready.</p>
        </div>
      </section>

      <section className="px-5 md:px-8 pb-16 sm:pb-24 md:pb-32">
        <div className="max-w-[1400px] mx-auto grid lg:grid-cols-12 gap-10 lg:gap-16">
          <div className="lg:col-span-4">
            <p className="font-mono text-[10px] uppercase tracking-[0.25em] text-accent-ink mb-4">The business</p>
            <h2 className="font-display font-extrabold uppercase tracking-tighter text-3xl sm:text-4xl leading-[0.95]">Context &amp; challenge</h2>
          </div>
          <div className="lg:col-span-8 space-y-8">
            <div>
              <h3 className="font-display uppercase tracking-tight text-lg sm:text-xl mb-2">The context</h3>
              <p className="font-sans text-base sm:text-lg text-ink/70 leading-relaxed">{project.context}</p>
            </div>
            <div>
              <h3 className="font-display uppercase tracking-tight text-lg sm:text-xl mb-2">The challenge</h3>
              <p className="font-sans text-base sm:text-lg text-ink/70 leading-relaxed">{project.challenge}</p>
            </div>
          </div>
        </div>
      </section>

      <section className="px-5 md:px-8 py-16 sm:py-24 bg-neon text-black">
        <div className="max-w-[1400px] mx-auto grid lg:grid-cols-12 gap-10 lg:gap-16">
          <div className="lg:col-span-4">
            <p className="font-mono text-[10px] uppercase tracking-[0.25em] text-black/60 mb-4">The response</p>
            <h2 className="font-display font-extrabold uppercase tracking-tighter text-3xl sm:text-4xl leading-[0.95]">Design with a job to do</h2>
          </div>
          <ul className="lg:col-span-8 divide-y divide-black/20 border-y border-black/20">
            {project.response.map((item, index) => (
              <li key={item} className="grid grid-cols-[2.5rem_1fr] sm:grid-cols-[3.5rem_1fr] gap-3 py-5 sm:py-6">
                <span className="font-display font-extrabold text-2xl sm:text-3xl">0{index + 1}</span>
                <p className="font-sans text-base sm:text-lg leading-relaxed">{item}</p>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="px-5 md:px-8 py-16 sm:py-24 md:py-28">
        <div className="max-w-[1400px] mx-auto grid lg:grid-cols-12 gap-10 lg:gap-16 items-start">
          <div className="lg:col-span-4">
            <p className="font-mono text-[10px] uppercase tracking-[0.25em] text-accent-ink mb-4">Business value</p>
            <h2 className="font-display font-extrabold uppercase tracking-tighter text-3xl sm:text-4xl leading-[0.95]">Built to support the next step</h2>
          </div>
          <p className="lg:col-span-8 font-sans text-xl sm:text-2xl md:text-3xl text-ink/75 leading-relaxed">{project.value}</p>
        </div>
      </section>

      <section className="px-5 md:px-8 pb-24 sm:pb-32">
        <div className="max-w-[1400px] mx-auto border-t border-ink/15 pt-8 sm:pt-10 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
          <div>
            <p className="font-mono text-[10px] uppercase tracking-[0.25em] text-accent-ink mb-2">Have a similar challenge?</p>
            <h2 className="font-display font-extrabold uppercase tracking-tighter text-3xl sm:text-4xl">Let’s talk about it</h2>
          </div>
          <button onClick={() => onNavigate('contact')} className="rounded-full bg-neon px-7 py-4 font-mono text-xs font-bold uppercase tracking-[0.2em] text-black hover:scale-[1.03] transition-transform">Discuss your project ↗</button>
        </div>
      </section>

      <nav aria-label="Case study navigation" className="px-5 md:px-8 pb-20 sm:pb-28">
        <div className="max-w-[1400px] mx-auto grid sm:grid-cols-2 gap-4">
          <a href={`#/case-study/${previousSlug}`} className="group relative isolate overflow-hidden rounded-2xl border border-ink/15 p-6 sm:p-8 hover:border-neon/60 transition-colors">
            <img src={`${base}images/${previousProject.caseStudyThumbnail}`} alt="" aria-hidden="true" loading="lazy" decoding="async" className="pointer-events-none absolute inset-0 hidden h-full w-full scale-105 object-cover opacity-0 transition duration-400 ease-out md:block md:group-hover:scale-100 md:group-hover:opacity-35" />
            <span aria-hidden="true" className="pointer-events-none absolute inset-0 hidden bg-gradient-to-r from-black/80 via-black/60 to-black/75 opacity-0 transition-opacity duration-300 md:block md:group-hover:opacity-100" />
            <span className="relative z-10 font-mono text-[10px] uppercase tracking-[0.2em] text-ink/45 transition-colors md:group-hover:text-white/70">← Previous project</span>
            <span className="relative z-10 mt-3 block font-display font-bold uppercase tracking-tight text-2xl sm:text-3xl group-hover:text-accent-ink md:group-hover:text-neon transition-colors">{previousProject.title}</span>
          </a>
          <a href={`#/case-study/${nextSlug}`} className="group relative isolate overflow-hidden rounded-2xl border border-ink/15 p-6 sm:p-8 text-left sm:text-right hover:border-neon/60 transition-colors">
            <img src={`${base}images/${nextProject.caseStudyThumbnail}`} alt="" aria-hidden="true" loading="lazy" decoding="async" className="pointer-events-none absolute inset-0 hidden h-full w-full scale-105 object-cover opacity-0 transition duration-400 ease-out md:block md:group-hover:scale-100 md:group-hover:opacity-35" />
            <span aria-hidden="true" className="pointer-events-none absolute inset-0 hidden bg-gradient-to-l from-black/80 via-black/60 to-black/75 opacity-0 transition-opacity duration-300 md:block md:group-hover:opacity-100" />
            <span className="relative z-10 font-mono text-[10px] uppercase tracking-[0.2em] text-ink/45 transition-colors md:group-hover:text-white/70">Next project →</span>
            <span className="relative z-10 mt-3 block font-display font-bold uppercase tracking-tight text-2xl sm:text-3xl group-hover:text-accent-ink md:group-hover:text-neon transition-colors">{nextProject.title}</span>
          </a>
        </div>
      </nav>
    </main>
  );
}
